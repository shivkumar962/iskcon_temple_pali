import { ToastContainer } from 'react-toastify'

export default function ReactToast() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={6000}
        theme="light" // or "dark"
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  )
}
