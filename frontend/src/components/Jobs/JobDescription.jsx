import React, { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from '../shared/Navbar';

const JobDescription = () => {
    
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }


    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);
    console.log(singleJob)
    return (
        <>
            <Navbar />
            <div className="pt-24 px-4 sm:px-6 lg:px-8 bg-background text-foreground min-h-screen">
                <div className="max-w-5xl mx-auto bg-card border border-border rounded-2xl shadow p-6 sm:p-10 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{singleJob?.title}</h1>
                            <div className="flex flex-wrap gap-2 mt-4">
                                <Badge variant="outline" className="rounded-full border-border bg-muted text-foreground px-3 py-1 text-sm">
                                    {singleJob?.postion} Position(s)
                                </Badge>
                                <Badge variant="outline" className="rounded-full border-border text-foreground bg-muted px-3 py-1 text-sm">
                                    {singleJob?.jobType}
                                </Badge>
                                <Badge variant="outline" className="rounded-full border-border text-foreground  bg-muted px-3 py-1 text-sm">
                                    {singleJob?.salary} LPA
                                </Badge>
                            </div>

                        </div>
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`mt-2 sm:mt-0 px-6 py-2 text-sm font-medium rounded-xl transition ${isApplied
                                ? 'bg-muted cursor-not-allowed text-muted-foreground'
                                : 'bg-primary hover:bg-primary/90 text-white'
                                }`}
                        >
                            {isApplied ? 'Already Applied' : 'Apply Now'}
                        </Button>
                    </div>

                    <div className="space-y-4 text-sm sm:text-base">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <DetailItem label="Role" value={singleJob?.title} />
                            <DetailItem label="Location" value={singleJob?.location} />
                            <DetailItem label="Experience" value={`${singleJob?.experience} yrs`} />
                            <DetailItem label="Salary" value={`${singleJob?.salary} LPA`} />
                            <DetailItem label="Total Applicants" value={singleJob?.applications?.length} />
                            <DetailItem
                                label="Posted Date"
                                value={singleJob?.createdAt?.split('T')[0]}
                            />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Job Description</h2>
                            <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                                {singleJob?.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const DetailItem = ({ label, value }) => (
    <div className="flex flex-col">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{value}</span>
    </div>
);

export default JobDescription;
