import ImageCard from "../common/card/image-card"

import Image from '../../assets/images/sigiriya.jpg'

const Places = () => {
  return (
    <div className="py-10 flex flex-row flex-wrap gap-y-7 gap-x-3 justify-center lg:justify-start lg:gap-x-7">
      <ImageCard 
        image={Image} 
        title={'Sigiriya'} 
        description={'Here are the biggest enterprise technology acquisitions of 2021 sofar, in reverse chronological order.'}
        stars={4.8}
       />
      <ImageCard 
        image={Image} 
        title={'Sigiriya'} 
        description={'Here are the biggest enterprise technology acquisitions of 2021 sofar, in reverse chronological order.'}
        stars={4.8}
       />
      <ImageCard 
        image={Image} 
        title={'Sigiriya'} 
        description={'Here are the biggest enterprise technology acquisitions of 2021 sofar, in reverse chronological order.'}
        stars={4.8}
       />
      <ImageCard 
        image={Image} 
        title={'Sigiriya'} 
        description={'Here are the biggest enterprise technology acquisitions of 2021 sofar, in reverse chronological order.'}
        stars={4.8}
       />
      <ImageCard 
        image={Image} 
        title={'Sigiriya'} 
        description={'Here are the biggest enterprise technology acquisitions of 2021 sofar, in reverse chronological order.'}
        stars={4.8}
       />
    </div>
  )
}

export default Places
