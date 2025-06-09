import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Search, MapPin, Building2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import buildingImage from "@/images/mansion.webp";
import { apiVerify } from "@/schema/apiSchema";
import axios from "axios";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const Explore = () => {
  const [explore, setExplore] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("name");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/explore`);
        
        if (!res.data || !Array.isArray(res.data.explore)) {
          throw new Error("Invalid response format");
        }

        setExplore(res.data.explore);
        toast.success("Projects loaded successfully");
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError(error.response?.data?.message || "Failed to load projects");
        toast.error(error.response?.data?.message || "Failed to load projects");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredExplore = explore.filter((item) => {
    if (!item?.project) return false;
    
    const searchTerm = searchQuery.toLowerCase().trim();
    if (!searchTerm) return true;

    if (filterBy === "name") {
      return item.project.name?.toLowerCase().includes(searchTerm);
    } else {
      return item.project.location?.toLowerCase().includes(searchTerm);
    }
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const renderProjectCard = (project) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className="w-full max-w-[400px]"
    >
      <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
        <CardContent className="p-0">
          <div className="relative group">
            <div className="relative h-[250px] w-full overflow-hidden">
              <img
                src={project?.project?.displayImage || buildingImage}
                alt={project.project.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = buildingImage;
                  e.target.onerror = null;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-sm font-light line-clamp-2">
                {project.project.description || "No description available"}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start p-4 gap-3 bg-white">
          <div className="flex flex-col gap-1 w-full">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold truncate pr-2">
                {project.project.name}
              </h3>
              <Badge variant="secondary" className="shrink-0">
                {project.project.status || "Active"}
              </Badge>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <p className="text-sm truncate">{project.project.location}</p>
            </div>
          </div>
          <div className="flex items-center justify-between w-full pt-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Building2 className="h-4 w-4 mr-1" />
              <span>{project.project.type || "Residential"}</span>
            </div>
            <Link to={`/explore-info/${project._id}`}>
              <Button size="sm" className="gap-2">
                View Details
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );

  const renderSkeleton = () => (
    <Card className="w-full max-w-[400px] overflow-hidden border-none shadow-lg">
      <CardContent className="p-0">
        <Skeleton className="h-[250px] w-full" />
      </CardContent>
      <CardFooter className="flex flex-col items-start p-4 gap-3 bg-white">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-5 w-20" />
          </div>
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center justify-between w-full pt-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-28" />
        </div>
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="relative h-[400px] sm:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={buildingImage}
            alt="Building"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        
        {/* Search Section */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl"
          >
            <Card className="p-6 backdrop-blur-sm bg-white/90 shadow-xl border-none">
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-3xl font-bold mb-2">Find Your Dream Project</h1>
                  <p className="text-muted-foreground">
                    Explore our collection of premium construction projects
                  </p>
                </div>

                <RadioGroup
                  value={filterBy}
                  onValueChange={setFilterBy}
                  className="flex justify-center gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="name" id="name" />
                    <Label htmlFor="name" className="text-base">Search by Name</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="location" id="location" />
                    <Label htmlFor="location" className="text-base">Search by Location</Label>
                  </div>
                </RadioGroup>

                <div className="flex gap-3">
                  <Input
                    type="text"
                    placeholder={`Search by ${filterBy === "name" ? "Project Name" : "Location"}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 h-12 text-base"
                  />
                  <Button size="lg" className="h-12 px-6">
                    <Search className="h-5 w-5 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="container mx-auto px-4 py-16">
        {error ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-destructive bg-destructive/10 p-8 rounded-lg"
          >
            <p className="text-lg mb-4">{error}</p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="gap-2"
            >
              Try Again
            </Button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
          >
            {isLoading
              ? Array(6).fill(null).map((_, index) => (
                  <div key={index}>{renderSkeleton()}</div>
                ))
              : filteredExplore.length > 0
              ? filteredExplore.map(renderProjectCard)
              : (
                <motion.div 
                  variants={itemVariants}
                  className="col-span-full text-center p-12 bg-muted/50 rounded-lg"
                >
                  <p className="text-lg text-muted-foreground mb-4">
                    No projects found matching your search criteria
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setFilterBy("name");
                    }}
                  >
                    Clear Search
                  </Button>
                </motion.div>
              )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Explore;
