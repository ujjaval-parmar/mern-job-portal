import { useEffect, useState } from "react";
import Banner from "../components/Banner"
import Card from "../components/Card";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/Sidebar";
import Newsletter from "../components/Newsletter";
import { useSelector } from "react-redux";

const initialSelectedCategory = {
  jobLocation: '',
  maxPrice: '',
  salaryType: '',
  experienceLevel: '',
  employmentType: '',
  jobPostingTime: ''
}

const Home = () => {

  const [selectedCategory, setSelectedCategory] = useState(initialSelectedCategory);
  const [jobs, setJobs] = useState([]);
  const [jobLocations, setJobLocations] = useState(new Set([]));
  const [query, setQuery] = useState("");
  const [isLaoding, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    
    setIsLoading(true);
    fetch('http://localhost:5000/getAllJobs')
      .then(response => response.json())
      .then(data => {
        setJobs(data.data);
        setJobLocations(()=>{
          return new Set(data.data.map(job=> job.jobLocation));
        })

      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));

  }, []);

  

  // Filter job by Title:
  // const filteredItems = jobs.filter(job=> job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1);

  const filteredItems = jobs.filter(job => job.jobTitle.toLowerCase().includes(query.toLowerCase()));

  // --Radio based filtering:
  const handleChange = e => {
    // e.preventDefault();
    // setSelectedCategory(e.target.value);
    const inputName = e.target.name;
    setSelectedCategory({...selectedCategory, [inputName]: e.target.value})
  }

  // --Button basded filtering:
  const handleClick = e => {
    setSelectedCategory(e.target.value);
  }

  // Calculate the index range:
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;

    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  }

  // Function for Next page:
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  }

  // Function for Previous page:
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  // Main Function
  const filteredData = (jobs, selected, query) => {

    let filtredJobs = [...jobs];

    // FIltering input items:
    if (query) {
      filtredJobs = filteredItems;

    }

    // console.log(selected);

    

    // My Category Filtering:
    for(const category in selectedCategory){
      // console.log(category)
      // console.log(selectedCategory[category]);
      
      if(selectedCategory[category]){
        filtredJobs = filtredJobs.filter((job, i)=>{
          
          // console.log(i, job[category], selectedCategory[category]);

          if(category === 'jobPostingTime') 
            return job['postingDate'] >= selectedCategory[category];

          if(category=== 'maxPrice')
            return Number(job[category] >= Number(selectedCategory[category]));

          return job[category].toLowerCase() === selectedCategory[category].toLowerCase()
        })

      }


    }
    // console.log(filtredJobs);
    

    // Slice the Data based on current page:
    const { startIndex, endIndex } = calculatePageRange();

    filtredJobs = filtredJobs.slice(startIndex, endIndex);

    return filtredJobs.map((data, i) => <Card key={i} data={data} />)

  }

  const result = filteredData(jobs, selectedCategory, query);


  const handleInputChange = e => {
    setQuery(e.target.value)
  }

  // console.log(selectedCategory);


  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14">

      <Banner query={query} handleInputChange={handleInputChange} />



      {/* Main Content */}
      <div className="bg-[#fafafa] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">

        {/* Left side */}
        <div className="bg-white p-4 rounded"><Sidebar handleChange={handleChange} handleClick={handleClick} jobLocations={jobLocations} /></div>

        {/* Jobs Cards */}
        <div className="col-span-2 bg-white p-4 rounded">
          {isLaoding ?
            (<p className="font-medium">Laoding....</p>) :
            result.length > 0 ?
              <Jobs result={result} /> :
              <>
                <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
                <p>No Jobs Found!</p>
              </>
          }



          {/* Paginabtion  */}
          {
            result.length > 0 ?
              (
                <div className="flex justify-center mt-4 space-x-8">
                  <button onClick={prevPage} className="hover:underline" disabled={currentPage === 1}>Previous</button>
                  <span className="mx-2">Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
                  <button onClick={nextPage}
                  disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)} className="hover:underline" >Next</button>
                </div>
              )
              : ''
          }

        </div>

        {/* Right side */}
        <div className="bg-white p-4 rounded"><Newsletter /></div>

      </div>


    </div>
  )
}

export default Home