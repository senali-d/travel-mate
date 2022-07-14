import { useEffect, useState } from 'react'
import { Form } from 'antd'
import { useMutation } from '@apollo/client'

import client from '../../apallo-client'
import AuthContainer from '../../containers/auth'
import { GET_PLACES_BY_ID, GET_PLACE } from '../../graphql/queries'
import { CREATE_PLACE, UPDATE_PLACE } from '../../graphql/mutation'
import FlatCard from '../common/card/flat-card'
import FormInput from '../common/form-element/input-emement'
import Button from '../common/button'
import Loader from '../common/loader'
import Thumbnail from '../../assets/images/thumbnail.png'

const MyPlaces = () => {
  const { getUserInfo } = AuthContainer.useContainer()
  const [form] = Form.useForm()
  const { id } = getUserInfo()
  
  const [places, setPlaces] = useState([])
  const [place, setPlace] = useState({})
  const [isLoadingList, setIsLoadingList] = useState(true)
  const [placeImage, setPlaceImage] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  
  useEffect(() => {
    getPlaces()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getPlaces = async () => {
    const {
      data: { getPlaceListById },
      loading,
    } = await client.query({
      query: GET_PLACES_BY_ID,
      variables: {
        user_id: id,
      },
    })
    setPlaces(getPlaceListById)
    setIsLoadingList(loading)
  }

  const getPlace = async (placeId) => {
    const {
      data: { getPlace },
      /* loading, */
    } = await client.query({
      query: GET_PLACE,
      variables: {
        id: placeId,
      },
    })
    setPlace(getPlace)
    successHandler(getPlace)
  }

  const successHandler = (place) => {
    form.setFieldsValue({
      title: place.title,
      description: place.description,
      photo: place.photo,
      longitude: place.longitude,
      latitude: place.latitude,
    })
    setPlaceImage(place.photo)
  }

  const handleInitialCreate = () => {
    setPlace({})
    form.resetFields()
    setPlaceImage('')
    setIsEdit(false)
  }

  const handleSelect = (id) => {
    getPlace(id)
    setIsEdit(true)
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
        setPlaceImage(data.url)
      })
      .catch((err) => console.log(err))
  }

  const [createPlace, { loading: createLoading, /* error: createError */ }] = useMutation(CREATE_PLACE)
  const [updatePlace, { loading, /* error */ }] = useMutation(UPDATE_PLACE)


  const handleSubmit = () => {
    form
    .validateFields()
    .then((value) => {
      createUpdatePlace(value)
    })
    .catch((err) => {
      console.log(err)
    })
  }
  
  const createUpdatePlace = async(placeData) => {
    if(isEdit) {
      try {
        const {
          data: { updatePlace: updatedPlace },
        } = await updatePlace({
          variables: {
            id: place.id,
            title: placeData.title,
            description: placeData.description,
            photo: placeImage,
            longitude: placeData.longitude,
            latitude: placeData.latitude,
            points: 5,
            user_id: id,
          },
        })
        successHandlerCreateUpdate(updatedPlace)
      } catch (error) {
        console.error(error)
      }
    }else {
      try {
        const { data: { insertPlace: newPlace }} = await createPlace({
          variables: {
            title: placeData.title,
            description: placeData.description,
            photo: placeImage,
            longitude: placeData.longitude,
            latitude: placeData.latitude,
            points: 5,
            user_id: id,
          },
        })
        successHandlerCreateUpdate(newPlace)
      } catch (error) {
        
      }
    }
  }

  const successHandlerCreateUpdate = (newPlace) => {
    if(isEdit) {
      const clonePlaces = [...places]
      const objIndex = clonePlaces.findIndex((obj => obj.id === newPlace.id));
      
      console.log("Before update: ", clonePlaces[objIndex])

      clonePlaces[objIndex] = newPlace
      
      console.log("After update: ", clonePlaces[objIndex])
      setPlaces(clonePlaces)
    }else {
      setPlaces([...places, newPlace])
    }
    form.resetFields()
    setPlaceImage('')
    setIsEdit(false)
  }

  return (
    <div className="container px-5 md:px-0 flex justify-center md:justify-start">
      <div className="p-4 md:w-1/3 w-full text-center bg-white rounded-lg border shadow-md sm:p-8">
        {isLoadingList ? (
          <Loader loading={isLoadingList} />
        ) : (
          places &&
          places.map((place) => (
            <FlatCard
              key={place.id}
              image={place.photo}
              title={place.title}
              subtitle={place.description}
              onClick={() => handleSelect(place.id)}
            />
          ))
        )}
      </div>
      <div className="p-4 md:w-2/3 w-full flex flex-col justify-center bg-white rounded-lg border shadow-md sm:p-8">
        {
          <div className="pb-4 flex justify-end">
            <Button
              title="Create Trip"
              size="sm"
              onClick={handleInitialCreate}
            />
          </div>
        }
        <Form
          form={form}
          onFinish={handleSubmit}
          className="w-full flex flex-row flex-wrap gap-2"
        >
          <div className="w-full flex flex-col items-center">
            <img
              className="w-24 h-24 rounded-full shadow-lg mb-[-96px]"
              src={placeImage !== "" ? placeImage : Thumbnail}
              alt={place.title}
            />
            <label htmlFor="file-upload" className="w-24 h-24 rounded-full" />
            <input
              className="invisible"
              type="file"
              id="file-upload"
              name="avatar"
              accept="image/png, image/jpeg"
              onChange={handleImageUpload}
            />
          </div>
          <div className="w-full">
            <FormInput
              name="title"
              placeholder="Name of location"
              rules={[
                {
                  required: true,
                  message: "Please enter your name of the location",
                },
              ]}
            />
          </div>
          <div className="w-full">
            <FormInput
              name="description"
              placeholder="Description of location"
              type="textarea"
              rules={[
                {
                  required: true,
                  message: "Please enter description",
                },
              ]}
            />
          </div>
          <div className="w-[calc(50%-8px)]">
            <FormInput
              name="longitude"
              placeholder="Longitude"
              rules={[
                {
                  required: true,
                  message: "Please enter longitude of location",
                },
              ]}
            />
          </div>
          <div className="w-[calc(50%-8px)]">
            <FormInput
              name="latitude"
              placeholder="Latitude"
              rules={[
                {
                  required: true,
                  message: "Please enter latitude of location",
                },
              ]}
            />
          </div>
          <div className="w-full flex justify-center">
            <Button
              title={isEdit ? "Update Trip" : "Create Trip"}
              loading={loading || createLoading}
            />
          </div>
        </Form>
      </div>
    </div>
  )
}

export default MyPlaces