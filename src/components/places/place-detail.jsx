import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import { useMutation } from '@apollo/client'
import { Form } from 'antd'

import client from '../../apallo-client'
import { CREATE_REVIEW, UPDATE_PLACE } from '../../graphql/mutation'
import { GET_PLACE } from '../../graphql/queries'
import AuthContainer from '../../containers/auth'
import Button from '../common/button'
import star from '../../assets/images/star.svg'
import starFill from '../../assets/images/star-fill.svg'
import Loader from '../common/loader'
import FormInput from '../common/form-element/input-emement'
import Map from "../common/map"

const PlaceDetail = () => {
  const { isAuthenticated, getUserInfo } = AuthContainer.useContainer()
  const { pathname } = useLocation()
  const [form] = Form.useForm()

  const [place, setPlace] = useState({
    id: "",
    title: "",
    photo: "",
    location: "",
    description: "",
    reviewList: [],
  })
  const [starPoints, setStarPoints] = useState([
    { point: false },
    { point: false },
    { point: false },
    { point: false },
    { point: false },
  ])
  const [userId, setUserId] = useState(null)
  const [stars, setStars] = useState(0)
  const [isLoadingPlace, setIsLoadingPlace] = useState(true)

  const id = pathname.split("/")[2]

  useEffect(() => {
    getPlaceDetail()
  }, [])

  useEffect(() => {
    const user = getUserInfo()
    if (user !== undefined) {
      setUserId(user.id)
    }
  }, [getUserInfo])

  const getPlaceDetail = async () => {
    const {
      data: { getPlace },
      loading,
    } = await client.query({
      query: GET_PLACE,
      variables: {
        id: id,
      },
    })
    setPlace(getPlace)
    setIsLoadingPlace(loading)
  }

  const [createReview, { loading, error }] = useMutation(CREATE_REVIEW)
  const [updatePlace] = useMutation(UPDATE_PLACE)

  const createPlaceReview = async (value) => {
    try {
      const {
        data: { insertReview },
      } = await createReview({
        variables: {
          place_id: id,
          review: value.review,
          stars: stars,
          user_id: userId,
        },
      })
      form.resetFields()
      setStarPoints([
        { point: false },
        { point: false },
        { point: false },
        { point: false },
        { point: false },
      ])
      let placeUpdate = { ...place }
      let cloneReviewList = [...place.reviewList]
      cloneReviewList.push(insertReview)
      placeUpdate.reviewList = cloneReviewList
      setPlace(placeUpdate)
      updatePlacePoints(stars, place.points)
      setStars(0)
    } catch (error) {
      console.log(error)
    }
  }

  const loadStars = (stars) => {
    const starsArray = [...Array(stars).keys()]
    const emptyStarsArray = [...Array(5 - stars).keys()]
    return (
      <>
        {starsArray.map((index) => (
          <img key={index} src={starFill} width="15" className="mr-1" />
        ))}
        {emptyStarsArray.map((index) => (
          <img key={index} src={star} width="15" className="mr-1" />
        ))}
      </>
    )
  }

  const loadStarPoints = (stars) => {
    return stars.map((s, index) => (
      <img
        key={index}
        src={s.point ? starFill : star}
        width="18"
        className="mr-1 cursor-pointer"
        onClick={() => handleToggle(index)}
      />
    ))
  }

  const updatePlacePoints = async(oldPoints, newPoint) => {
    const point = oldPoints+newPoint
    try {
      const {
        data: { updatePlace: updated },
      } = await updatePlace({
        variables: {
          id: id,
          points: point,
        },
      })
      setPlace(updated)
    } catch (error) {
      console.log(error)
    }
  }

  const handleToggle = (index) => {
    let newArray = [...starPoints]
    newArray[index] = { ...newArray[index], point: !newArray[index].point }
    setStarPoints(newArray)
    if (newArray[index].point === true) {
      setStars(parseInt(stars) + 1)
    } else {
      setStars(parseInt(stars) - 1)
    }
  }

  const handleSubmit = () => {
    form
    .validateFields()
    .then((value) => {
      createPlaceReview(value)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        {isLoadingPlace ? (
          <div className="container px-5 mx-auto flex justify-center">
            <Loader loading={isLoadingPlace} />
          </div>
        ) : (
          <div className="container px-5 md:px-0 mx-auto">
            <div className="mx-auto flex flex-wrap">
              <img
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                alt={place.title}
                src={place?.photo}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {place.location}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {place?.title}
                </h1>
                <div className="flex mb-4 pt-1">
                  {loadStars(
                    parseInt(
                      (place?.points !== undefined && place.reviewList.length > 0) ? parseInt(place?.points)/place.reviewList.length : 0
                    )
                  )}
                </div>
                <p className="leading-relaxed">{place.description}</p>
              </div>
            </div>
            {(isAuthenticated() || place.reviewList.length > 0) && (
              <p className="pt-10 mx-auto flex flex-col font-medium text-xl text-gray-900">
                Reviews
              </p>
            )}
            {isAuthenticated() && (
              <div className="mx-auto flex flex-wrap pt-5">
                <div className="flex gap-1 mb-5">
                  {loadStarPoints(starPoints)}
                </div>
                <Form
                  form={form}
                  onFinish={handleSubmit}
                  className="w-full flex flex-row flex-wrap gap-2"
                >
                  <div className="w-full">
                    <FormInput
                      name="review"
                      type="textarea"
                      placeholder="Please enter your review here..."
                      rules={[
                        {
                          required: true,
                          message: "Please enter your review",
                        },
                      ]}
                    />
                  </div>
                  <Button
                    title="Review"
                    loading={loading}
                  />
                </Form>
              </div>
            )}
            {place.reviewList.length > 0 && (
              <>
                {place.reviewList.map((review) => (
                  <div
                    key={review.id}
                    className="pt-5 mx-auto flex flex-col"
                  >
                    <div className="flex items-center mb-4 space-x-4">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={review.user.image}
                        alt={review.user.name}
                      />
                      <div className="space-y-1 font-medium">
                        <p>
                          {review.user.name}
                          <time className="block text-sm text-gray-500">
                            Joined on{" "}
                            {moment(review.user.created_at).format("MMMM YYYY")}
                          </time>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center mb-1">
                      {loadStars(review.stars)}
                    </div>
                    <div className="mb-5 text-sm text-gray-500">
                      <p>
                        Reviewed in the {review.user.country} on
                        <time>
                          {` ${moment(review.created_at).format(
                            "MMM DD, YYYY"
                          )}`}
                        </time>
                      </p>
                    </div>
                    <p className="mb-2 font-light text-gray-500">
                      {review.review}
                    </p>
                  </div>
                ))}
              </>
            )}
            {(place.longitude && place.latitude) && 
              <div className="mx-auto flex flex-wrap pt-5 h-[300px]">
                <Map lng={place.longitude} lat={place.latitude} />
              </div>
            }
          </div>
        )}
      </section>
    </div>
  )
}

export default PlaceDetail
