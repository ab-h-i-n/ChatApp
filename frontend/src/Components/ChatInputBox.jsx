import React from 'react'

const ChatInputBox = () => {
  return (
    <div className='fixed bottom-5 w-screen grid grid-cols-[1fr,50px] px-5 gap-x-2'>

        {/* input box  */}
        <input type="text" className='rounded-full bg-themeNavyDark px-3 py-2 text-themeWhite outline-none focus:ring-2 ring-themeOrange' placeholder='Message' />

        {/* send button  */}
        <div className='bg-themeOrange w-[50px] grid place-content-center aspect-square rounded-full'>
            <img src="/sendIcon.svg" alt="send" className='w-7' />
        </div>

    </div>
  )
}

export default ChatInputBox