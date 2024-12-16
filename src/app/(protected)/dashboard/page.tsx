"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'

const Dashboard = () => {
    const { user } = useUser()
    return (
        <div>Dashboard
            {user?.firstName}
        </div>
    )
}

export default Dashboard