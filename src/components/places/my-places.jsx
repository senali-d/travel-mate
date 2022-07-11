import FlatCard from '../common/card/flat-card'

const myPlaces = () => {
  return (
    <div className="container px-5 md:px-0 flex justify-center md:justify-start">
      <div className="p-4 md:max-w-xs w-xs max-w-full w-full bg-white rounded-lg border shadow-md sm:p-8">
        <FlatCard
          image={"https://res.cloudinary.com/zencloude/image/upload/v1656916912/tsodzkyt4cleohpsxz8j.jpg"}
          title="Title"
          subtitle="Subtitle"
        />
        <FlatCard
          image={"https://res.cloudinary.com/zencloude/image/upload/v1656916912/tsodzkyt4cleohpsxz8j.jpg"}
          title="Title"
          subtitle="Subtitle"
        />
        <FlatCard
          image={"https://res.cloudinary.com/zencloude/image/upload/v1656916912/tsodzkyt4cleohpsxz8j.jpg"}
          title="Title"
          subtitle="Subtitle"
        />
        <FlatCard
          image={"https://res.cloudinary.com/zencloude/image/upload/v1656916912/tsodzkyt4cleohpsxz8j.jpg"}
          title="Title"
          subtitle="Subtitle"
        />
      </div>
    </div>
  )
}

export default myPlaces
