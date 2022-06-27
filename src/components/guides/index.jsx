import ProfileCard from '../common/card/profile-card'
import Image from '../../assets/images/julian-wan.jpg'

const Guides = () => {
  return (
    <div className="py-10 flex flex-row flex-wrap gap-y-7 gap-x-3 justify-center lg:justify-start lg:gap-x-7">
      <ProfileCard 
        image={Image} 
        name={'Bonnie James'}
        locations={['Kandy', 'Jaffna']}
        email={'info@test.com'} 
        mobile={"0980980987"}
      />
      <ProfileCard 
        image={Image} 
        name={'Bonnie James'}
        locations={['Kandy', 'Jaffna']}
        email={'info@test.com'} 
        mobile={"0980980987"}
      />
      <ProfileCard 
        image={Image} 
        name={'Bonnie James'}
        locations={['Kandy', 'Jaffna']}
        email={'info@test.com'} 
        mobile={"0980980987"}
      />
      <ProfileCard 
        image={Image} 
        name={'Bonnie James'}
        locations={['Kandy', 'Jaffna']}
        email={'info@test.com'} 
        mobile={"0980980987"}
      />
      <ProfileCard 
        image={Image} 
        name={'Bonnie James'}
        locations={['Kandy', 'Jaffna']}
        email={'info@test.com'} 
        mobile={"0980980987"}
      />
    </div>
  )
}

export default Guides
