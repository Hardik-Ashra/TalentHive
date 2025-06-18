import React from "react";
import { Badge } from "../ui/badge";
import { Briefcase, MapPin } from "lucide-react";
import { useNavigate } from 'react-router-dom'
const LatestJobCard = ({job}) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/description/${job._id}`)} className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out">
      {/* Company & Location */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground transition-colors duration-200">
            {job?.company?.name}
          </h2>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>India</span>
          </div>
        </div>
        <div>
          <Badge
            variant="secondary"
            className="text-sm hover:scale-105 hover:shadow-md transition-transform"
          >
            24 LPA
          </Badge>
        </div>
      </div>

      {/* Job Title & Description */}
      <div>
        <h3 className="text-xl font-semibold text-primary flex items-center gap-2 group transition-colors duration-200">
          <Briefcase className="w-5 h-5" />
          <span className="group-hover:text-foreground transition-colors">
            {job?.title}
          </span>
        </h3>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          {job?.description}
        </p>
      </div>

      {/* Job Meta Tags */}
      <div className="flex flex-wrap gap-2 pt-2">
        <Badge className="text-xs px-3 py-1 hover:scale-105 hover:shadow-sm transition-transform" variant="ghost">{job?.position} Positions</Badge>
        <Badge className="text-xs px-3 py-1 hover:scale-105 hover:shadow-sm transition-transform" variant="ghost">{job?.jobType}</Badge>
        <Badge className="text-xs px-3 py-1 hover:scale-105 hover:shadow-sm transition-transform" variant="ghost">{job?.salary}LPA</Badge>

      </div>
    </div>
  );
};

export default LatestJobCard;
