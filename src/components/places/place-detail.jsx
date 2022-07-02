import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

import client from '../../apallo-client'
import { GET_PLACE } from '../../graphql/queries'

const PlaceDetail = () => {
  const { pathname } = useLocation()

  const [place, setPlace] = useState({
    id: "",
    title: "",
    photo: "",
    location: "",
    description: "",
    reviewList: []
  })

  const id = pathname.split("/")[2];

  useEffect(() => {
    getPlaceDetail()
  }, [])

  const getPlaceDetail = async () => {
    const {
      data: { getPlace },
    } = await client.query({
      query: GET_PLACE,
      variables: {
        id: id,
      },
    })
    setPlace(getPlace)
  }

  const loadStars = (stars) => {
    const starsArray = [...Array(stars).keys()]
    const emptyStarsArray = [...Array(5-stars).keys()]
    return (
      <>
        {starsArray.map(() =>
          <AiFillStar className="text-[#b1b845]" />
        )}
        {emptyStarsArray.map(() =>
          <AiOutlineStar className="text-[#b1b845]" />
        )}
      </>
    )
  }

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
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
              <div className="flex mb-4">
                <AiFillStar className="text-[#b1b845]" />
                <AiFillStar className="text-[#b1b845]" />
                <AiFillStar className="text-[#b1b845]" />
                <AiFillStar className="text-[#b1b845]" />
                <AiOutlineStar className="text-[#b1b845]" />
              </div>
              <p className="leading-relaxed">{place.description}</p>
            </div>
          </div>
          {place.reviewList.length > 0 &&
            <>
              <p className="pt-10 lg:w-4/5 mx-auto flex flex-col font-medium text-xl text-gray-900">Reviews</p>
              {place.reviewList.map((review) =>
                <div className="pt-10 lg:w-4/5 mx-auto flex flex-col">
                  <div className="flex items-center mb-4 space-x-4">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={review.user.image}
                      alt={review.user.name}
                    />
                    <div className="space-y-1 font-medium dark:text-white">
                      <p>
                        {review.user.name}
                        <time
                          className="block text-sm text-gray-500 dark:text-gray-400"
                        >
                          Joined on {moment(review.user.created_at).format('MMMM YYYY')}
                        </time>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mb-1">
                    {loadStars(review.stars)}
                  </div>
                  <div className="mb-5 text-sm text-gray-500 dark:text-gray-400">
                    <p>
                      Reviewed in the {review.user.country} on
                      <time>
                        {` ${moment(review.created_at).format('MMM DD, YYYY')}`}
                      </time>
                    </p>
                  </div>
                  <p className="mb-2 font-light text-gray-500 dark:text-gray-400">
                    {review.review}
                  </p>
                </div>
              )}
            </>
          }
        </div>
      </section>
    </div>
  )
}

export default PlaceDetail
