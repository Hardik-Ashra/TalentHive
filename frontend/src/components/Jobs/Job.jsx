import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  console.log(job)
  const navigate = useNavigate();

 const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] hover:border-accent-primary cursor-pointer">
      {/* Top Row */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-muted-foreground select-none">{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button variant="outline" size="icon" className="rounded-full hover:bg-primary/10 transition-colors">
          <Bookmark className="w-5 h-5 text-muted-foreground" />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-5 mb-5">
        <Avatar className="w-14 h-14 hover:ring-2 hover:ring-primary transition-all rounded-full">
          <AvatarImage src={job?.company?.logo} alt={`${job?.company?.name} logo`} />
        </Avatar>
        <div>
          <h2 className="font-semibold text-lg text-foreground">{job?.company?.name}</h2>
          <p className="text-sm text-muted-foreground">India</p>
        </div>
      </div>

      {/* Job Details */}
      <div className="mb-6 relative">
        <h3 className="text-xl font-bold text-foreground mb-2">{job?.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3 relative pr-4">
        {job?.description}
          <span className="absolute bottom-0 right-0 h-6 w-12 bg-gradient-to-l from-card to-transparent pointer-events-none" />
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-3 mt-1">
        <Badge className="text-xs px-3 py-1 hover:scale-105 hover:shadow-sm transition-transform" variant="ghost">{job?.position} Positions</Badge>
               <Badge className="text-xs px-3 py-1 hover:scale-105 hover:shadow-sm transition-transform" variant="ghost">{job?.jobType}</Badge>
               <Badge className="text-xs px-3 py-1 hover:scale-105 hover:shadow-sm transition-transform" variant="ghost">{job?.salary}LPA</Badge>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 mt-6">
        <Button
          variant="outline"
        onClick={()=> navigate(`/description/${job?._id}`)} 
          className="px-6 py-2 text-sm font-semibold transition-transform active:scale-95"
        >
          Details
        </Button>
        <Button
          className="bg-primary text-white px-6 py-2 text-sm font-semibold hover:bg-primary/90 transition-transform active:scale-95"
        >
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
