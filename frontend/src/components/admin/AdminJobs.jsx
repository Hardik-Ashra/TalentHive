import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className=" bg-background text-foreground">
      <Navbar />
      <main className="max-w-6xl min-h-screen mx-auto mt-30 px-4  mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <Input
            className="w-full md:w-1/2 border-border bg-card text-foreground placeholder:text-muted-foreground"
            placeholder="Search by name or role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-primary text-white hover:bg-primary/90 transition"
          >
            + New Job
          </Button>
        </div>

        <section className="bg-card border border-border rounded-xl shadow-sm">
          <AdminJobsTable />
        </section>
      </main>
    </div>
  );
}

export default AdminJobs
