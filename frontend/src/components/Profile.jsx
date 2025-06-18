import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from '../Profile/AppliedJobTable';
import UpdateProfileDialog from '../Profile/UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Main content with padding top to avoid navbar overlap */}
      <main className="max-w-4xl mx-auto pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Profile Card */}
        <section className="bg-card border border-border rounded-2xl p-8 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 shrink-0">
                <AvatarImage
                  src={user?.profile?.profilePhoto}
                  alt="profile"
                />
              </Avatar>
              <div>
                <h1 className="font-semibold text-2xl text-foreground mb-1">{user?.fullname}</h1>
                <p className="text-muted-foreground max-w-xs sm:max-w-sm">{user?.profile?.bio}</p>
              </div>
            </div>

            <Button
              variant="outline"
              className="rounded-md hover:bg-primary/10 transition flex items-center justify-center p-3"
              aria-label="Edit Profile"
              title="Edit Profile"
              onClick={() => setOpen(true)}
            >
              <Pen className="w-5 h-5" />
            </Button>
          </div>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-4 text-muted-foreground text-sm sm:text-base">
              <Mail className="w-5 h-5 shrink-0" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground text-sm sm:text-base">
              <Contact className="w-5 h-5 shrink-0" />
              <span>{user?.phoneNumber}</span>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="font-semibold mb-3 text-lg text-foreground">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {user?.profile?.skills.length !== 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge
                    className="cursor-default select-none py-1 px-3 text-sm"
                    key={index}>
                      {item}
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground">NA</span>
              )}
            </div>
          </div>

          <div className="mt-10 max-w-sm">
            <Label className="text-md font-bold mb-2 block text-foreground">Resume</Label>
            {isResume ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={user?.profile?.resume} 
                className="text-primary hover:underline break-words text-sm sm:text-base"
              >
               {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span className="text-muted-foreground">NA</span>
            )}
          </div>
          <div>
            <h1 className="font-bold text-2xl mt-14 mb-6 text-foreground">Applied Jobs</h1>
            <AppliedJobTable /></div>
          <UpdateProfileDialog open={open} setOpen={setOpen} />
        </section>
      </main>
    </div>
  );
};

export default Profile;
