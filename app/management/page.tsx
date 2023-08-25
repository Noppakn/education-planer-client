'use client'
import React,{ useEffect, useState }from 'react'
import axios from 'axios';
import { Select, Modal ,Input, DatePicker, Button} from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';

export default function page() {
  const [scholarships, setScholarships] = useState([]);
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const [university, setUniversity] = useState('');
  const [programName, setProgramName] = useState('');
  const [degree, setDegree] = useState('');
  const [language, setLanguage] = useState('');
  const [startDate, setStartDate] = useState('2023-01');
  const [originalTuition, setOriginalTuition] = useState('');
  const [scholarshipTuition, setScholarshipTuition] = useState('');
  const [scholarshipAccommodation, setScholarshipAccommodation] = useState('');
  const [scholarshipLiving, setScholarshipLiving] = useState('');
  const [tuitionToPay, setTuitionToPay] = useState('');
  const [accommodationToPay, setAccommodationToPay] = useState('');
  const [livingToPay, setLivingToPay] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState(null);
  const [btnStatus, setBtnStatus] = useState("Create");
  const [programID, setProgramID] = useState('');



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

  const createScholarship = async () => {
    try {
      const requestBody = {
        university : university,
        program_name: programName,
        level_of_degree: degree,
        teaching_language: language,
        start_date: startDate,
        tuition: scholarshipTuition,
        accommodation : scholarshipAccommodation,
        living: scholarshipLiving,
        tuition_to_pay: tuitionToPay,
        orig_tuition: originalTuition,
        accommodation_to_pay: accommodationToPay,
        living_expense_to_pay: scholarshipLiving,
        universities_logo: 'https://www.cucas.cn//resource/new/images/school/logo/logo_1333.png',
        
      };
  
      const response = await axios.post('http://4.194.6.98:3001/api/v1/scholarships', requestBody);
  
      if (response.status === 201) {
        alert('Scholarship created successfully:');
        setUniversity('');
        setProgramName('');
        setDegree('');
        setLanguage('');
        setStartDate('2023-01');
        setOriginalTuition('');
        setScholarshipTuition('');
        setScholarshipAccommodation('');
        setScholarshipLiving('');
        setTuitionToPay('');
        setAccommodationToPay('');
        setLivingToPay('');
        window.location.reload()

        // ทำการอัปเดต state หรือทำอื่น ๆ ตามที่คุณต้องการ
      }
    } catch (error) {
        alert('Error creating scholarship');
        console.error(error);
      // จัดการข้อผิดพลาดตามที่คุณต้องการ
    }
  };

  const updateScholarship = async () => {
    try {
      const requestBody = {
        university : university,
        program_name: programName,
        level_of_degree: degree,
        teaching_language: language,
        start_date: startDate,
        tuition: scholarshipTuition,
        accommodation : scholarshipAccommodation,
        living: scholarshipLiving,
        tuition_to_pay: tuitionToPay,
        orig_tuition: originalTuition,
        accommodation_to_pay: accommodationToPay,
        living_expense_to_pay: scholarshipLiving
        
      };
      
      const response = await axios.put(`http://4.194.6.98:3001/api/v1/scholarships/${programID}`, requestBody);
      if (response.status === 200) {
        alert('Scholarship update successfully:');
        setUniversity('');
        setProgramName('');
        setDegree('');
        setLanguage('');
        setStartDate('2023-01');
        setOriginalTuition('');
        setScholarshipTuition('');
        setScholarshipAccommodation('');
        setScholarshipLiving('');
        setTuitionToPay('');
        setAccommodationToPay('');
        setLivingToPay('');
        setProgramID('');
        setBtnStatus("Create");
        window.location.reload()

        // ทำการอัปเดต state หรือทำอื่น ๆ ตามที่คุณต้องการ
      }
    } catch (error) {
        alert('Error Update scholarship');
        console.error(error);
      // จัดการข้อผิดพลาดตามที่คุณต้องการ
    }
  };


  function convertDateFormat(inputDate : string) {
    if (inputDate.startsWith('2')) {
      return inputDate;
    } else {
    const months: { [key: string]: string } = {
      Jan: '01', Feb: '02', Mar: '03', Apr: '04',
      May: '05', Jun: '06', Jul: '07', Aug: '08',
      Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };
  
    const [month, year] = inputDate.split(',');
    const formattedMonth = months[month];
    return `${year}-${formattedMonth}`;
  }
}

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
      setCurrentPage((prevPage) => prevPage - 1);
    };

  const handleSave = () => {
    if (university == '' || programName == '' || degree == '' || language == '' || startDate == '' || originalTuition == '' || scholarshipTuition == '' || scholarshipAccommodation == '' || scholarshipLiving == '' || tuitionToPay == '' || accommodationToPay == '' || livingToPay == '') {
      alert("Please fill in all the blanks")
    } else if (btnStatus == 'Create') {
      createScholarship();
    } else {
      updateScholarship();
    }
  };

  const handleCancel = () => {
    setUniversity('');
    setProgramName('');
    setDegree('');
    setLanguage('');
    setStartDate('2023-01');
    setOriginalTuition('');
    setScholarshipTuition('');
    setScholarshipAccommodation('');
    setScholarshipLiving('');
    setTuitionToPay('');
    setAccommodationToPay('');
    setLivingToPay('');
    setProgramID('');
    setBtnStatus("Create");
  }

  const showModal = (programId : number) => {
    setSelectedProgramId(programId);
    setIsModalVisible(true);
  };

  const handleDelete = async () => {
    // เรียกใช้ API สำหรับลบข้อมูลโดยใช้ selectedProgramId
    try {
      // ทำการลบข้อมูลด้วย API และตรวจสอบการตอบสนอง
      await axios.put(`http://4.194.6.98:3001/api/v1/scholarships/delete/${selectedProgramId}`);
      alert('Scholarships deleted successfully')
      window.location.reload()
      // อัปเดต state หรือทำอื่น ๆ ตามที่คุณต้องการหลังการลบสำเร็จ
    } catch (error) {
      console.error('Error deleting scholarship:', error);
      // จัดการข้อผิดพลาดตามที่คุณต้องการ
    }

    setIsModalVisible(false);
  };

  const handleCancelDelete = () => {
    setIsModalVisible(false);
  };

  const editScholarship = async (scholarship) => {
    const date = convertDateFormat(scholarship.start_date);
    setBtnStatus("Update");
    setUniversity(scholarship.university);
    setProgramName(scholarship.program_name);
    setDegree(scholarship.level_of_degree);
    setLanguage(scholarship.teaching_language);
    setStartDate(date);
    setOriginalTuition(scholarship.orig_tuition);
    setScholarshipTuition(scholarship.tuition);
    setScholarshipAccommodation(scholarship.accommodation);
    setScholarshipLiving(scholarship.living);
    setTuitionToPay(scholarship.tuition_to_pay);
    setAccommodationToPay(scholarship.accommodation_to_pay);
    setLivingToPay(scholarship.living_expense_to_pay);
    setProgramID(scholarship.program_id);
  }


  return (
    <div className='bg-white flex flex-col justify-center items-center h-full '>
      <h1>Program ID : {programID}</h1>
      <div className='grid gap-4 grid-cols-2 grid-rows-6 mb-4 '>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">University</span>
          </label>
          <input value={university} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs h-10" onChange={(e) => setUniversity(e.target.value)}/>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Program name</span>
          </label>
          <input value={programName}  type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs h-10" onChange={(e) => setProgramName(e.target.value)} />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Degree</span>
          </label>
          <Select
          value={degree} 
          style={{ width: 120 }}
          //onChange={handleDegree}
          options={[
            { value: 'Non-Degree', label: 'Non-Degree' },
            { value: 'Associate', label: 'Associate' },
            { value: 'Bachelor', label: 'Bachelor' },
            { value: 'Master', label: 'Master'},
            { value: 'Phd', label: 'Doctoral'},
          ]}
          onChange={(value:string) => setDegree(value)}
        />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Teaching Language</span>
          </label>
          <Select
          value={language} 
          style={{ width: 120 }}
          //onChange={handleLanguage}
          options={[
            { value: 'English', label: 'English' },
            { value: 'Chinese', label: 'Chinese' },
            
          ]}
          onChange={(value:string) => setLanguage(value)}
        />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Start Date</span>
          </label>
          <DatePicker value={dayjs(startDate)} picker="month" className='h-10' onChange={(date, dateString) => setStartDate(dateString)}/>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Original Tuition</span>
          </label>
          <input value={originalTuition} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs h-10" onChange={(e) => setOriginalTuition(e.target.value)} />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Scholarship Tuition Coverage</span>
          </label>
          <input value={scholarshipTuition} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs h-10" onChange={(e) => setScholarshipTuition(e.target.value)} />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Scholarship Accommodation Coverage</span>
          </label>
          <Select
          value={scholarshipAccommodation} 
          style={{ width: 120 }}
          onChange={(value:string) => setScholarshipAccommodation(value)}
          options={[           
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
            
            
          ]} 
        />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Scholarship Living Expenses Coverage</span>
          </label>
          <Select
          value={scholarshipLiving} 
          style={{ width: 120 }}
          onChange={(value:string) => setScholarshipLiving(value)}
          options={[
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
            
            
          ]} 
        />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Tuition To Pay</span>
          </label>
          <input value={tuitionToPay} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs h-10" onChange={(e) => setTuitionToPay(e.target.value)}/>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Accommodation To Pay</span>
          </label>
          <input value={accommodationToPay} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs h-10" onChange={(e) => setAccommodationToPay(e.target.value)} />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Living Expense To Pay</span>
          </label>
          <input value={livingToPay} type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs h-10" onChange={(e) => setLivingToPay(e.target.value)}/>
        </div>
        <button className="btn btn-outline btn-success" onClick={handleSave}>{btnStatus}</button>
        <button className="btn btn-outline btn-warning" onClick={handleCancel}>Cancel</button>





      </div>
      <div className='flex flex-col justify-center items-center h-full w-full'>
      <Input
          type="text"
          placeholder="Search by Program Name"
          value={searchTerm}
          className='w-2/3'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      <table className="table w-2/3">
      <thead>
          <tr>
            <th>ID</th>
            <th>University</th>
            <th>Program Name</th>
            <th>Degree</th>
            <th>Teaching Language</th>
            <th>Start Date</th>
            <th>Edit</th>
          </tr>
        </thead>
      {scholarships.filter((scholarship) =>scholarship.program_name.toLowerCase().includes(searchTerm.toLowerCase())).filter((scholarship) => scholarship.deleted !== true).sort((a, b) => a.program_id - b.program_id).slice(startIndex, endIndex).map((scholarship) => (  
        <tbody >
          <tr>
            <th >{scholarship.program_id}</th>
            <td >{scholarship.university}</td>
            <td >{scholarship.program_name}</td>
            <td>{scholarship.level_of_degree}</td>
            <th>{scholarship.teaching_language}</th>
            <td>{scholarship.start_date}</td> 
            <td> 
              
              <button className='ml-3' onClick={() => editScholarship(scholarship)}><EditOutlined /></button>
              <button className='ml-3' onClick={() => showModal(scholarship.program_id)}> <DeleteOutlined /></button>

              
            </td>
          </tr>
        </tbody>
      ))}
      </table>
      <Modal
        title="Confirm Delete"
        visible={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancelDelete}
        footer={[
          <Button key="Cancel" onClick={handleCancelDelete}>
          Cancel
        </Button>,
        <Button key="Delete" type="primary" danger onClick={handleDelete}> Delete </Button>
        ]}

      >
        Are you sure you want to delete this scholarship?
      </Modal>
        <div className='flex'>
          <button onClick={handlePrevPage} disabled={currentPage === 1} className='border-2 p-2 rounded-lg mr-3'>Prev</button>
          <span>Page {currentPage}</span>
          <button onClick={handleNextPage} className='border-2 p-2 rounded-lg ml-3'>Next</button>
        </div>
      </div>
    </div>
  )
}
