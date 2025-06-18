import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { useSelector } from 'react-redux'
const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector(store => store.job);

  const statusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'selected':
        return <Badge variant="success" className="shadow-sm">{status}</Badge>;
      case 'rejected':
        return <Badge variant="destructive" className="shadow-sm">{status}</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="shadow-sm">{status}</Badge>;
      default:
        return <Badge className="shadow-sm">{status}</Badge>;
    }
  };

  return (

    <Table className="min-w-full">
      <TableCaption className="text-muted-foreground text-left py-2 pl-4 font-medium">
        A list of your applied jobs
      </TableCaption>
      <TableHeader className="bg-background border-b border-border">
        <TableRow>
          <TableHead className="py-3 px-4 text-left text-sm font-semibold text-foreground uppercase tracking-wider">Date</TableHead>
          <TableHead className="py-3 px-4 text-left text-sm font-semibold text-foreground uppercase tracking-wider">Job Role</TableHead>
          <TableHead className="py-3 px-4 text-left text-sm font-semibold text-foreground uppercase tracking-wider">Company</TableHead>
          <TableHead className="py-3 px-4 text-right text-sm font-semibold text-foreground uppercase tracking-wider">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allAppliedJobs.length <= 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-muted-foreground py-6">
              You haven't applied to any job yet.
            </TableCell>
          </TableRow>
        ) : (
          allAppliedJobs.map((appliedJob) => (
            <TableRow
              key={appliedJob._id}
              className="cursor-pointer transition-colors duration-200 hover:bg-muted/30 focus-within:bg-muted/40"
              role="row"
            >
              <TableCell className="py-3 px-4 text-sm font-medium text-foreground whitespace-nowrap">
                {appliedJob?.createdAt?.split("T")[0]}
              </TableCell>
              <TableCell className="py-3 px-4 text-sm text-muted-foreground">
                {appliedJob.job?.title}
              </TableCell>
              <TableCell className="py-3 px-4 text-sm text-muted-foreground">
                {appliedJob.job?.company?.name}
              </TableCell>
              <TableCell className="py-3 px-4 text-sm text-right">
                {statusBadge(appliedJob.status)}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>

    </Table>

  );
};

export default AppliedJobTable;
