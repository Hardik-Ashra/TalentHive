import React from 'react';
import Navbar from './shared/Navbar';
import Job from "../components/Jobs/Job";
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
const Browse = () => {
  const { allJobs } = useSelector(store => store.job);

  return (
    <div>
      <Navbar />
      <div className='min-w-screen max-w-7xl mx-auto mt-30 px-4'>
        <h1 className='font-bold text-xl mb-8'>Search Results ({allJobs.length})</h1>

        {allJobs.length === 0 ? (
          <p className="text-muted-foreground">No jobs found.</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {allJobs.map((job, index) => (<motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
