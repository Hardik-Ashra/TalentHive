import React, { useEffect, useState } from 'react'
import Navbar from "./shared/Navbar";
import FilterCard from "./Jobs/FilterCard";
import Job from "../components/Jobs/Job";
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';


const Jobs = () => {
 
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);
  return (
    <>
      <Navbar />
      <div className="bg-background text-foreground min-h-screen pt-20 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Page Title */}
          <header className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold">
              Explore <span className="text-primary">Latest Job Openings</span>
            </h1>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">
              Browse from a curated list of top tech opportunities.
            </p>
          </header>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <aside className="hidden lg:block">
              <FilterCard />
            </aside>

            {/* Job Listings */}
            <section className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
               { filterJobs.length <= 0 ? (
                  <p className="text-muted-foreground col-span-full text-center">
                    No jobs found.
                  </p>
                ) : (
                  filterJobs.map((job) =>  <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>)
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
