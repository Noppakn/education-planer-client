'use client'
import React,{ useEffect, useState }from 'react'
import axios from 'axios';
import Image from 'next/image'
import UKflag from '@/app/images/UK-flag.png'
import CHflag from '@/app/images/CH-flag.png'
import { Select, Switch ,Modal} from 'antd';
import { CalendarOutlined, CloseOutlined, CheckOutlined,SwapOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const ITEMS_PER_PAGE = 5;
export default function Search() {
    const router = useRouter();
    

    const [scholarships, setScholarships] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRowCount, setFilteredRowCount] = useState(0);
    const [filterDegree, setFilterDegree] = useState('');
    const [filterLanguage, setFilterLanguage] = useState('');
    const [filterAccommodation, setFilterAccommodation] = useState('');
    const [filterLiving, setFilterLiving] = useState('');
    const [compareList, setCompareList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    
    

    useEffect(() => {
      async function fetchScholarships() {
        try {
          const response = await axios.get('http://4.194.6.98:3001/api/v1/scholarships');
          setScholarships(response.data.data);
        } catch (error) {
          console.error('Error fetching scholarships:', error);
        }
      }
  
      fetchScholarships();
    }, []);

    useEffect(() => {
        
        setFilteredRowCount(filteredScholarships.length);
      }, [scholarships, searchTerm, filterDegree, filterLanguage, filterAccommodation, filterLiving]);
    
  
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

  

  
    const filteredScholarships = scholarships
      .filter((scholarship) => scholarship.teaching_language.toLowerCase().includes(filterLanguage.toLowerCase()))
      .filter((scholarship) => scholarship.level_of_degree.toLowerCase().includes(filterDegree.toLowerCase()))
      .filter((scholarship) => scholarship.program_name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((scholarship) => scholarship.accommodation.toLowerCase().includes(filterAccommodation.toLowerCase()))
      .filter((scholarship) => scholarship.living.toLowerCase().includes(filterLiving.toLowerCase()))
      .filter((scholarship) => scholarship.deleted !== true);
      
      
      
    const handleNextPage = () => {
      setCurrentPage((prevPage) => prevPage + 1);
    };
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
      };
  
    const handleDegree = (value: string) => {
      if (value === 'All') {
        setFilterDegree('');
      } else {
        setFilterDegree(value);
      }
    }

    const handleLanguage = (value: string) => {
        if (value === 'All') {
          setFilterLanguage('');
        } else {
          setFilterLanguage(value);
        }
    }

    const handleAccommodation = (value: string) => {
      if (value === 'All') {
        setFilterAccommodation('');
      } else {
        setFilterAccommodation(value);
      }
    }
    const handleLiving = (value: string) => {
      if (value === 'All') {
        setFilterLiving('');
      } else {
        setFilterLiving(value);
      }
  }
  const onSwitchChange = (checked,scholarship) => {
    if (checked) {
      setCompareList((prevList) => [...prevList, scholarship]);
    } else {
      setCompareList((prevList) => prevList.filter(item => item.program_id !== scholarship.program_id));
    }
    
  }
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
 
  return (
    <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 p-4 border-r ">
        <h2>Filter by Level of Degree</h2>   
        <Select
          defaultValue="All"
          style={{ width: 120 }}
          onChange={handleDegree}
          options={[
            { value: 'All', label: 'All' },
            { value: 'Non-Degree', label: 'Non-Degree' },
            { value: 'Associate', label: 'Associate' },
            { value: 'Bachelor', label: 'Bachelor' },
            { value: 'Master', label: 'Master'},
            { value: 'Phd', label: 'Doctoral'},
          ]}
        />
        <h2 className='mt-5'>Teaching Langauge</h2>
        <Select
          defaultValue="All"
          style={{ width: 120 }}
          onChange={handleLanguage}
          options={[
            { value: 'All', label: 'All' },
            { value: 'English', label: 'English' },
            { value: 'Chinese', label: 'Chinese' },
            
          ]}
        />
        <h2 className='mt-5'>Accommodation Coverage</h2>
        <Select
          defaultValue="All"
          style={{ width: 120 }}
          onChange={handleAccommodation}
          options={[
            { value: 'All', label: 'All' },
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
            
          ]}
        />
        <h2 className='mt-5'>Living Coverage</h2>
        <Select
          defaultValue="All"
          style={{ width: 120 }}
          onChange={handleLiving}
          options={[
            { value: 'All', label: 'All' },
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
            
          ]} 
        />
        
        </div>
        <div className="w-full md:w-3/4 p-4">
        <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by program name"
            className='border-2 p-2 rounded-xl mb-4 w-ful'
        />
        <div className='mb-4'>
          <span>Program found : {filteredRowCount}</span>
          <div>
            <button onClick={handlePrevPage} disabled={currentPage === 1} className='border-2 p-2 rounded-lg mr-3'>Prev</button>
            <span>Page {currentPage}</span>
            <button onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredRowCount / 5)} className='border-2 p-2 rounded-lg ml-3'>Next</button>
            {compareList.length > 0 && (
            <button className='ml-5 text-[#337CCF]' onClick={openModal}>
              <SwapOutlined /> Compare List ({compareList.length})
            </button>)}
            <Modal
              title="Compare List"
              visible={modalVisible}
              onCancel={closeModal}
              className=''
              width="80vw"
              style={{ maxHeight: '80vh' }}
            ><div className='flex justify-center items-center h-full'>
              <div>
                <p className='mt-5 rounded-tl-lg bg-[#4A55A2] p-3 font-bold text-white'>Criteria</p>
                <p className='bg-[#F1F6F9] p-3 '>Program</p>
                <p className=' p-3 '>Degree</p>
                <p className='bg-[#F1F6F9] p-3 '>Original Tuition</p>
                <p className=' p-3 '>Start Date</p>
                <p className='bg-[#4A55A2] p-3 font-bold text-white'>Scholarship Coverage</p>
                <p className='bg-[#F1F6F9] p-3 '>Tuition</p>
                <p className=' p-3 '>Accommodation</p>
                <p className='bg-[#F1F6F9] p-3 '>Living Expense</p>
                <p className='bg-[#4A55A2] p-3 font-bold text-white'>You Need to Pay</p>
                <p className=' p-3 '>Tuition</p>
                <p className='bg-[#F1F6F9] p-3 '>Accommodation</p>
                <p className=' p-3 '>Living Expense</p>
              </div>
              {compareList.map((scholarship) => (
                
                <div key={scholarship.program_id} className="">
                  <p className='mt-5 bg-[#4A55A2] p-3 font-bold text-white w-full border-l text-center'>{scholarship.university}</p>
                  <p className='bg-[#F1F6F9] p-3 w-full w-full border-l text-center'>{scholarship.program_name}</p>
                  <p className=' p-3 w-full border-l text-center'>{scholarship.level_of_degree}</p>
                  <p className='bg-[#F1F6F9] p-3 w-full border-l text-center'>{scholarship.orig_tuition}</p>
                  <p className=' p-3 w-full border-l text-center'>{scholarship.start_date}</p>
                  <p className='bg-[#4A55A2] p-3 font-bold text-transparent'>Scholarship Coverage</p>
                  <p className='bg-[#F1F6F9] p-3 w-full border-l text-center'>{scholarship.tuition}</p>
                  <p className=' p-3 w-full border-l text-center'>{scholarship.accommodation}</p>
                  <p className='bg-[#F1F6F9] p-3 w-full border-l text-center'>{scholarship.living}</p>
                  <p className='bg-[#4A55A2] p-3 font-bold text-transparent'>You Need to Pay</p>
                  <p className=' p-3 w-full border-l text-center'>{scholarship.tuition_to_pay}</p>
                  <p className='bg-[#F1F6F9] p-3 w-full border-l text-center'>{scholarship.accommodation_to_pay}</p>
                  <p className=' p-3 w-full border-l text-center'>{scholarship.living_expense_to_pay}</p>
                </div>
                
              ))}
              </div>
            </Modal>

        </div>
        </div>
        <div>
            {filteredScholarships.slice(startIndex, endIndex).map((scholarship) => (
            <div key={scholarship.program_id} className="flex rounded-lg border p-4 mb-4  bg-white">
                <div className='w-[10%] text-center'>
                <Image
                    alt="University"
                    src={scholarship.universities_logo}
                    width={200}
                    height={200}
                    className="w-full h-auto"
                    //layout="responsive"
                    
                />
                <Switch 
                  className='bg-[#8C8C8C] mt-10' 
                  checkedChildren="Compare" 
                  unCheckedChildren="Uncompare"  
                  onChange={(checked) => {
                    if (checked && compareList.length >= 3) {
                      Modal.error({
                        title: "Can't select more than three programs",
                        content: 'Please unselect a program before adding more.',
                        
                      });
                      
                    } else {
                      onSwitchChange(checked,scholarship);
                    }
                  }}/>
                </div>
                <div className='w-full'>
                  <div className='ml-10 flex w-full'>
                    <div className=' w-1/3'>
                      <h2 className='text-slate-600 font-bold'>{scholarship.program_name}</h2>
                      <p className='font-light'>{scholarship.university}</p>
                      <p className=''>Original Tuition : {scholarship.orig_tuition} RMB</p>
                      {scholarship.level_of_degree == "Non-Degree" && <p className='drop-shadow-md shadow-[#61677A] rounded-md mt-5 w-2/5 text-center border border-[#61677A] text-[#61677A] font-light'>{scholarship.level_of_degree}</p>} 
                      {scholarship.level_of_degree == "Associate" && <p className='drop-shadow-md shadow-[#609966] rounded-md mt-5 w-1/4  text-center border border-[#609966] text-[#609966] font-light'>{scholarship.level_of_degree}</p>}
                      {scholarship.level_of_degree == "Bachelor" && <p className='drop-shadow-md shadow-[#068FFF] rounded-md mt-5 w-1/4  text-center border border-[#068FFF] text-[#068FFF] font-light'>{scholarship.level_of_degree}</p>}
                      {scholarship.level_of_degree == "Master" && <p className='drop-shadow-md shadow-[#974EC3] rounded-md mt-5 w-1/4  text-center border border-[#974EC3] text-[#974EC3] font-light'>{scholarship.level_of_degree}</p>}
                      {scholarship.level_of_degree == "Phd" && <p className='drop-shadow-md shadow-[#F29727] rounded-md mt-5 w-1/4  text-center border border-[#F29727] text-[#F29727] font-light'>Doctoral</p>} 
                    </div>
                      <div className='flex flex-col justify-end w-1/3 mt-auto'>
                      <div className='flex items-center text-center'><CalendarOutlined /><p className='font-light ml-1'>{scholarship.start_date}</p></div>
                      {scholarship.teaching_language == "English" && <div className='flex items-center text-center mt-3'><p className='font-light pr-1'>Language :</p> <Image src={UKflag} className='w-auto h-5 mt-2'/></div>}
                      {scholarship.teaching_language == "Chinese" && <div className='flex items-center text-center mt-3'><p className='font-light pr-1'>Language :</p> <Image src={CHflag} className='w-auto h-5 mt-2'/></div>}
                    </div>
                  </div>
                  <div className='flex ml-10 mt-5 border-t'>
                    <div className='flex flex-col w-1/3 pt-3'>
                      <p className='text-transparent mb-1'>Scholarship Coverage</p>
                      <p className='font-bold text-[#337CCF] border-b'>Tuition</p>
                      <p className='font-bold text-[#337CCF] border-b'>Accommodation</p>
                      <p className='font-bold text-[#337CCF] '>Living Expense</p>
                    </div>
                    <div className='flex flex-col w-1/3 pt-3 '>
                      <p className='font-bold text-[#1450A3] mb-1'>Scholarship Coverage</p>
                      <p className='border-b font-light'>{scholarship.tuition}</p>
                      {scholarship.accommodation == "No" && <p className='border-b'><CloseOutlined /></p>}
                      {scholarship.accommodation == "Yes" && <p className='border-b'><CheckOutlined /></p>}
                      {scholarship.living == "No" && <p><CloseOutlined /></p>}
                      {scholarship.living == "Yes" && <p><CheckOutlined /></p>}
                    </div>
                    <div className='flex flex-col w-1/2 pt-3'>
                      <p className='font-bold text-[#1450A3] mb-1'>You Need to Pay</p>
                      <p className='font-light border-b'>{scholarship.tuition_to_pay}</p>
                      <p className='font-light border-b'>{scholarship.accommodation_to_pay}</p>
                      <p className='font-light '>{scholarship.living_expense_to_pay}</p>
                    </div>
                    
                    
                  </div>
                </div>
                </div>
            ))}
        </div>
        <div>
            <button onClick={handlePrevPage} disabled={currentPage === 1} className='border-2 p-2 rounded-lg mr-3'>Prev</button>
            <span>Page {currentPage}</span>
            <button onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredRowCount / 5)} className='border-2 p-2 rounded-lg ml-3'>Next</button>
        </div>
        
        </div>
    </div>
  )
}

