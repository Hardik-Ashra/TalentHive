import React from "react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from 'react-redux'; 
const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
 console.log(allJobs)
  return (
    <section className="bg-background px-6 py-10 max-w-7xl mx-auto space-y-12">
      {/* Section Heading */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
          <span className="text-muted-foreground">Latest & Top</span>{" "}
          <span className="text-primary">Job Openings</span>
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
          Discover curated job opportunities from top companies. Apply directly and grow your career!
        </p>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {   allJobs.length <= 0 ? <span>No Job Available</span> : allJobs?.slice(0,6).map((job) => <LatestJobCard key={job._id} job={job}/>)}
      </div>
    </section>
  );
};

export default LatestJobs;
