"use client"
import Loader from '@/components/Loader'
import MeetingRoom from '@/components/MeetingRoom'
import MeetingSetup from '@/components/MeetingSetup'
import { useGetCallById } from '@/hooks/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import React,{useState} from 'react'

const Meeting = ({params: {id}}: {params:{id:string}}) => {
  const { user,isLoaded} = useUser()
  const [isSetupComplete, setIsSetUpComplete] = useState(false)
  const {call , isCallLoading} = useGetCallById(id)

  if (!isLoaded || isCallLoading) return <Loader/>

  return (
    <div className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
         {
          !isSetupComplete ? (
            <MeetingSetup setIsSetUpComplete={setIsSetUpComplete}/>
          ) : (
            <MeetingRoom/>
          )
         }
        </StreamTheme>
      </StreamCall>
    </div>
  )
}

export default Meeting