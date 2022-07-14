import { Form } from 'antd'

import Button from '../common/button'
import FormInput from '../common/form-element/input-emement'

const Contact = () => {
  const [form] = Form.useForm()

  const handleSubmit = () => {
    form
      .validateFields()
      .then((value) => {
        contactSubmit(value)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const contactSubmit = (contact) => {
    // try {
    //   const {
    //     data: { updateUser: updatedUser },
    //   } = await updateUser({
    //     variables: {
    //       email: contact.email,
    //       message: contact.message,
    //     },
    //   })
    //   successHandler(updatedUser)
    // } catch (error) {
    //   console.error(error)
    // }
  }

  const successHandler = () => {
    form.resetFields()
  }

  return (
    <section className="text-gray-600 body-font relative">
      <div className="absolute inset-0">
        <img
          src="https://res.cloudinary.com/zencloude/image/upload/v1657783355/travel-mate/travellers_r0a0da.jpg"
          alt="image"
          loading="lazy"
          className="rounded-2xl"
        />
        <div className="bg-white absolute bottom-0 md:bottom-24 lg:bottom-8 flex-wrap hidden md:flex md:mx-6 py-6 rounded shadow-md w-full md:w-1/3">
          <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
            <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
              EMAIL
            </h2>
            <a className="text-[#b1b845] leading-relaxed hover:text-[#f1fc5a]">info@travelmate.com</a>
            <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
              PHONE
            </h2>
            <p className="leading-relaxed">123-456-7890</p>
          </div>
        </div>

      </div>
      <div className="container px-5 pb-0 md:pb-12 lg:pb-40 pt-24 mx-auto flex">
        <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-1 shadow-md">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            How can we help
          </h2>
          <p className="leading-relaxed mb-5 text-gray-600">
            Fill out the form with your message, and we will be in touch with you soon. 
          </p>
          <Form
            form={form}
            onFinish={handleSubmit}
            className="w-full flex flex-row flex-wrap gap-1"
          >
            <div className="w-full">
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
              />
            </div>
            <div className="w-full">
              <FormInput
                name="message"
                placeholder="Message"
                type="textarea"
                rules={[
                  {
                    required: true,
                    message: "Please enter your message",
                  }
                ]}
              />
            </div>
            <div className="w-full flex">
              <Button
                title="Submit"
                stylecss="w-full justify-center"
                // loading={loading}
              />
            </div>
          </Form>
          <p className="text-xs text-gray-500 mt-3">
            We'd love to hear from you. Thank you!
          </p>
          <div className="md:hidden mt-4">
            <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
              EMAIL: <a className="text-[#b1b845] leading-relaxed hover:text-[#f1fc5a]">info@travelmate.com</a>
            </h2>
            
            <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-2">
              PHONE: <span className="leading-relaxed">123-456-7890</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact
