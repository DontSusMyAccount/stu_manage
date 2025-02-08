import { Button, Modal, NumberInput, Radio, SimpleGrid, TextInput, Select, FileInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import React from 'react'
import axios from 'axios'
import { API } from '../../../Layout/API'
import { data } from 'react-router-dom'


function AddStudent() {
  const [opened, { open, close }] = useDisclosure()
  const form = useForm({
    initialValues: {
      stu_id: '',
      fname: '',
      lname: '',
      birthdate: '',
      address: '',
      email: '',
      tel: '',
      gender: '',
      salary: '',
      major_id: '',
      pic: '',
      FAC_DATA: [],
      MAJOR_DATA: [],
    }
  })


  const FetchFaculty = () => {
    axios.get(API+'/faculty.php').then((response) => {
      if (response.data.length !== 0) {
        const data = response.data
        const select = data.map((item) => ({
          label: item.fac_name,
          value: item.fac_id
        }));
        form.setValues({FAC_DATA: select})
        open();
      }
    })
  }

  const FetchMajor = (fac_id) => {
    axios.get(API+"/major.php?fac_id="+fac_id).then((response) => {
      if (response.data.length !== 0) {
        const data = response.data
        const select = data.map((item) => ({
          label: item.major_name,
          value: item.major_id
        }))
        form.setValues({MAJOR_DATA: select})
      }else{
        
      }
    })
  }

  const Submit=(data)=>{
    axios.post(API+"/student.php", data).then((response) => {
      if(response.data === "success"){
        alert("เพิ่มข้อมูลสำเร็จ")
        window.location.reload()
      }else{
        alert("เพิ่มข้อมูลไม่สำเร็จ")
      }
    })
  }
  return (
    <div>
      <Button color='violet.8' onClick={(() => { FetchFaculty() })} >
        เพิ่มข้อมูลนักศึกษา
      </Button>
      
      <Modal opened={opened} onClose={close} size={"lg"} title="เพิ่มข้อมูลนักศึกษา">
        <form onSubmit={form.onSubmit((data)=>{
          Submit(data)
        })} >
          <SimpleGrid cols={1}>
            <TextInput {...form.getInputProps("stu_id")} label="รหัสนักศึกษา" />
          </SimpleGrid>
          <SimpleGrid cols={2}>
            <TextInput {...form.getInputProps("fname")} label="ชื่อ" />
            <TextInput {...form.getInputProps("lname")} label="นามสกุล" />
          </SimpleGrid>
          <SimpleGrid cols={2}>
            <TextInput {...form.getInputProps("birthdate")} type='date' label="วันเกิด" />
          </SimpleGrid>
          <SimpleGrid cols={1}>
            <TextInput {...form.getInputProps("address")} label="ที่อยู่" />
          </SimpleGrid>
          <SimpleGrid cols={2}>
            <TextInput {...form.getInputProps("email")} label="อีเมล" />
            <TextInput {...form.getInputProps("tel")} label="เบอร์โทร" />
          </SimpleGrid>
          <SimpleGrid cols={1}>
            <Select 
              {...form.getInputProps("major_id")}
              data={form.values.MAJOR_DATA} 
              label="สาขา" />
          </SimpleGrid>
          <SimpleGrid cols={1}>
            <Select onChange={FetchMajor} 
              data={form.values.FAC_DATA} 
              label="คณะ" />
          </SimpleGrid>
          <SimpleGrid cols={1}>
            <FileInput 
              {...form.getInputProps("pic")}
              accept='image/jpg,image/png,image/jpeg' 
              label="เลือกรูปภาพ" 
              placeholder="Upload files"/>
          </SimpleGrid>
          <SimpleGrid cols={1}>
            <Radio.Group {...form.getInputProps("gender")} label="เพศ">
              <Radio value="M" label="ชาย" />
              <Radio value="F" label="หญิง" />
              <Radio value="G" label="เก" />
            </Radio.Group>
          </SimpleGrid>
          <SimpleGrid cols={1}>
            <NumberInput {...form.getInputProps("salary")} label="เงินเดือน" />
            <Button color='green.8' type='submit'>บันทึก</Button>
          </SimpleGrid>
        </form> 
      </Modal>
    </div>
  )
}



export default AddStudent
