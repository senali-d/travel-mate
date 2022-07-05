import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { Form } from 'antd'

import Button from '../common/button'
import AuthContainer from '../../containers/auth'
import client from '../../apallo-client'
import { GET_USER_BY_ID } from '../../graphql/queries'
import { UPDATE_USER } from '../../graphql/mutation'
import FormInput from '../common/form-element/input-emement'

const Profile = () => {
  const { getUserInfo } = AuthContainer.useContainer()
  const [form] = Form.useForm()
  const { id, image: userImage, name: username } = getUserInfo()
  
  const [profileImage, setProfileImage] = useState('')
  
  const [updateUser, { loading, /* error */ }] = useMutation(UPDATE_USER)

  useEffect(() => {
    getProfile()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getProfile = async () => {
    const {
      data: { getUser },
    } = await client.query({
      query: GET_USER_BY_ID,
      variables: {
        id: id,
      },
    })
    successHandler(getUser)
  }

  const updateProfile = async (profile) => {
    try {
      const {
        data: { updateUser: updatedUser },
      } = await updateUser({
        variables: {
          id: id,
          name: profile.name,
          image: profileImage,
          mobile: profile.mobile,
          country: profile.country,
        },
      })
      successHandler(updatedUser)
    } catch (error) {
      console.error(error)
    }
  }

  const handleImageUpload = (e) => {
    uploadImage(e.target.files[0])
  }

  const uploadImage = (image) => {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET)
    data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME)
    fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProfileImage(data.url)
      })
      .catch((err) => console.log(err))
  }

  const handleSubmit = () => {
    form
      .validateFields()
      .then((value) => {
        updateProfile(value)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const successHandler = (profile) => {
    form.setFieldsValue({
      name: profile.name,
      email: profile.email,
      image: profile.image,
      mobile: profile.mobile,
      country: profile.country,
    })
    setProfileImage(profile.image)
  }

  return (
    <div className="md:w-[75%] w-[100%] m-auto bg-white rounded-lg border border-gray-200 shadow-md pt-7 pb-10">
      <div className="flex flex-col items-center">
        <div className="w-[90%]">
          <Form
            form={form}
            onFinish={handleSubmit}
            className="w-full flex flex-row flex-wrap gap-2"
          >
            <div className="w-full flex flex-col items-center">
              <img
                className="w-24 h-24 rounded-full shadow-lg mb-[-96px]"
                src={profileImage !== '' ? profileImage : userImage}
                alt={username}
              />
              <label for="file-upload" className="w-24 h-24 rounded-full" />
              <input
                className="invisible"
                type="file"
                id="file-upload"
                name="avatar"
                accept="image/png, image/jpeg"
                onChange={handleImageUpload}
              />
            </div>
            <div className="w-[calc(50%-8px)]">
              <FormInput
                name="name"
                placeholder="Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your name!",
                  },
                ]}
              />
            </div>
            <div className="w-[calc(50%-8px)]">
              <FormInput
                name="email"
                placeholder="Email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email",
                  },
                  {
                    type: "email",
                    message: "Please enter a valid email",
                  },
                ]}
                disabled={true}
              />
            </div>
            <div className="w-[calc(50%-8px)]">
              <FormInput
                name="mobile"
                placeholder="Mobile"
                rules={[
                  {
                    required: true,
                    message: "Please enter your mobile number",
                  },
                  {
                    pattern: "^[0-9]{10}$",
                    message: "Please enter a valid mobile number",
                  },
                ]}
              />
            </div>
            <div className="w-[calc(50%-8px)]">
              <FormInput
                name="country"
                placeholder="Country"
                rules={[
                  {
                    required: true,
                    message: "Please enter your country",
                  },
                ]}
              />
            </div>
            <div className="w-full flex justify-center">
              <Button
                title="Update Profile"
                loading={loading}
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Profile
