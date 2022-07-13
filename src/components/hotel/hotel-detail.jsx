import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import { useMutation } from '@apollo/client'
import { Form } from 'antd'

import client from '../../apallo-client'
import { CREATE_HOTEL_REVIEW, UPDATE_HOTEL_POINT } from '../../graphql/mutation'
import { GET_HOTEL } from '../../graphql/queries'
import AuthContainer from '../../containers/auth'
import Button from '../common/button'
import star from '../../assets/images/star.svg'
import starFill from '../../assets/images/star-fill.svg'
import Loader from '../common/loader'
import FormInput from '../common/form-element/input-emement'
import Map from "../common/map"

const HotelDetail = () => {
  const { isAuthenticated, getUserInfo } = AuthContainer.useContainer()
  const { pathname } = useLocation()
  const [form] = Form.useForm()

  const [hotel, setHotel] = useState({
    id: "",
    title: "",
    photo: "",
    location: "",
    description: "",
    hotel_reviewList: [],
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const user = getUserInfo()
    if (user !== undefined) {
      setUserId(user.id)
    }
  }, [getUserInfo])

  const getPlaceDetail = async () => {
    const {
      data: { getHotel },
      loading,
    } = await client.query({
      query: GET_HOTEL,
      variables: {
        id: id,
      },
    })
    setHotel(getHotel)
    setIsLoadingPlace(loading)
  }

  const [createReview, { loading /* error */ }] = useMutation(CREATE_HOTEL_REVIEW)
  const [updateHotelPoint] = useMutation(UPDATE_HOTEL_POINT)

  const createHotelReview = async (value) => {
    try {
      const {
        data: { insertHotel_review },
      } = await createReview({
        variables: {
          hotel_id: id,
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
      let hotelUpdate = { ...hotel }
      let clonehotel_reviewList = [...hotel.hotel_reviewList]
      clonehotel_reviewList.push(insertHotel_review)
      hotelUpdate.hotel_reviewList = clonehotel_reviewList
      setHotel(hotelUpdate)
      updateHotelPoints(stars, hotel.points)
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
          <img
            key={index}
            alt="star"
            src={starFill}
            width="15"
            className="mr-1"
          />
        ))}
        {emptyStarsArray.map((index) => (
          <img key={index} alt="star" src={star} width="15" className="mr-1" />
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
        alt="star"
      />
    ))
  }

  const updateHotelPoints = async (oldPoints, newPoint) => {
    const point = oldPoints + newPoint
    try {
      const {
        data: { updateHotelPoint: updated },
      } = await updateHotelPoint({
        variables: {
          id: id,
          points: point,
        },
      })
      setHotel(updated)
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
        createHotelReview(value)
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
              <img
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                alt={hotel.name}
                src={hotel?.photo}
              />
            <div className="mx-auto flex flex-wrap">
              <div className="lg:w-2/3 w-full lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {hotel.location}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {hotel?.name}
                </h1>
                <p className="text-gray-500 text-md border-b border-gray-300 pb-3 mb-4">
                  {`${hotel.guests} guests . ${hotel.bedrooms} bedrooms . ${hotel.beds} beds`}
                </p>
                <div className="flex mb-4 pt-1">
                  {loadStars(
                    parseInt(
                      hotel?.points !== undefined && hotel.hotel_reviewList.length > 0
                        ? parseInt(hotel?.points) / hotel.hotel_reviewList.length
                        : 0
                    )
                  )}
                </div>
                <p className="leading-relaxed">{hotel.description}</p>
              </div>
              <div className="lg:w-1/3 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <div class="w-full">
                  <div class="h-full p-6 rounded-lg border-2 border-[#b1b845] flex flex-col relative overflow-hidden">
                    <div className="flex">
                      <h2 class="text-sm flex flex-1 tracking-widest title-font mb-5 font-medium">
                        <img
                          src={starFill}
                          width="12"
                          className="mr-1 cursor-pointer"
                          alt="star"
                        />
                        {hotel.points}
                      </h2>
                      <h2 class="text-sm flex tracking-widest title-font mb-5 font-medium">
                        {hotel.hotel_reviewList.length} reviews
                      </h2>
                    </div>
                    <h1 class="text-5xl text-gray-900 leading-none flex items-center pb-4 mb-4 border-b border-gray-200">
                      <span>${hotel.fee}</span>
                      <span class="text-lg ml-1 font-normal text-gray-500">
                        night
                      </span>
                    </h1>
                    <p class="flex items-center text-gray-600 mb-2">
                      <span class="h-4 mr-2 inline-flex flex-1 items-center flex-shrink-0">
                        ${hotel.fee} x 5
                      </span>
                      <span class="flex">
                        ${hotel.fee * 5}
                      </span>
                    </p>
                    <p class="flex items-center text-gray-600 mb-2">
                      <span class="h-4 mr-2 inline-flex flex-1 items-center flex-shrink-0">
                        Service fee
                      </span>
                      <span class="flex">
                        ${hotel.fee * 5 * 5/100}
                      </span>
                    </p>
                    <p class="flex items-center text-gray-800 mb-2 border-t pt-3 border-t-gray-500">
                      <span class="h-4 mr-2 text-lg inline-flex flex-1 items-center flex-shrink-0">
                        Total Fee
                      </span>
                      <span class="flex">
                        ${(hotel.fee * 5) + (hotel.fee * 5 * 5/100)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {(isAuthenticated() || hotel.hotel_reviewList.length > 0) && (
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
                  <Button title="Review" loading={loading} />
                </Form>
              </div>
            )}
            {hotel.hotel_reviewList.length > 0 && (
              <>
                {hotel.hotel_reviewList.map((review) => (
                  <div key={review.id} className="pt-5 mx-auto flex flex-col">
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
            {(hotel.longitude && hotel.latitude) && 
              <div className="mx-auto flex flex-wrap pt-5 h-[300px]">
                <Map lng={hotel.longitude} lat={hotel.latitude} />
              </div>
            }
          </div>
        )}
      </section>
    </div>
  );
}

export default HotelDetail
