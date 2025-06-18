import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from "react";
import { Menu, X, LogOut, User2 } from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            console.log(res.data.success);

            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <header className="w-full bg-background border-b border-border z-50 fixed top-0">
            <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 md:px-6">
                {/* Logo */}
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                    Talent<span className="text-primary">Hive</span>
                </h1>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-8 items-center text-sm font-medium text-muted-foreground">
                    {
                        user && user.role === 'recruiter' ? (<>
                            <Link to='/admin/companies' className="hover:text-foreground transition-colors">Companies</Link>
                            <Link to='/admin/jobs' className="hover:text-foreground transition-colors">Jobs</Link>
                        </>)
                            : (
                                <>
                                    <Link to='/' className="hover:text-foreground transition-colors">Home</Link>
                                    <Link to='/jobs' className="hover:text-foreground transition-colors">Jobs</Link>
                                    <Link to='/browse' className="hover:text-foreground transition-colors">Browse</Link>
                                </>
                            )
                    }

                </nav>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {!user ? (
                        <>
                            <div className="hidden md:flex gap-2">
                                <Link to='/login'>
                                    <Button variant="ghost">Login</Button></Link>
                                <Link to='/signup'> <Button>Signup</Button></Link>
                            </div>
                            <Button
                                variant="ghost"
                                className="md:hidden p-2"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </Button>
                        </>
                    ) : (
                        <>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        <AvatarFallback>TN</AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-64 mt-2">
                                    <div className="flex items-center gap-3 pb-3 border-b">
                                        <Avatar>
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-semibold text-sm">{user?.fullname}</h4>
                                            <p className="text-xs text-muted-foreground">{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3 space-y-2 text-sm">
                                        {
                                            user && user.role === 'student' && (<div className="flex items-center gap-2 cursor-pointer hover:text-primary">

                                                <User2 size={18} />
                                                <span><Link to='/profile'>View Profile</Link></span>
                                            </div>)
                                        }

                                        <div className="flex items-center gap-2 cursor-pointer hover:text-destructive">
                                            <LogOut size={18} />
                                            <Button onClick={logoutHandler} variant="link">Log Out</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <Button
                                variant="ghost"
                                className="md:hidden p-2"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                            </Button>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-background px-4 pt-2 pb-4 border-t border-border text-sm space-y-3"
                    >
                        <Link to='/' className="block text-muted-foreground hover:text-foreground">Home</Link>
                        <Link to='/jobs' className="block text-muted-foreground hover:text-foreground">Jobs</Link>
                        <Link to='/' className="block text-muted-foreground hover:text-foreground">Browse</Link>

                        {!user && (
                            <div className="pt-3 space-y-2">
                                <Link to='/login'> <Button variant="outline" className="w-full">Login</Button></Link>
                                <Link to='/signup'> <Button className="w-full">Signup</Button></Link>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
