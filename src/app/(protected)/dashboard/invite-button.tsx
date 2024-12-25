'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import UseProject from '@/hooks/use-project'

import React, { useState } from 'react'
import { toast } from 'sonner'


const InviteButton = () => {
    const { project } = UseProject()
    const [open, setOpen] = useState(false)
    return (
        <>
            <Dialog open={open} onOpenChange={() => setOpen(false)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Invite Team Members
                        </DialogTitle>
                    </DialogHeader>
                    <p className='text-sm text-gray-500'>
                        Ask them to Copy and past this link
                    </p>
                    <Input readOnly className='mt-4' onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/join/${project?.id}`)
                        toast.success('Link Copied')
                    }} value={`${window.location.origin}/join/${project?.id}`} />

                </DialogContent>

            </Dialog>
            <Button onClick={() => setOpen(true)} size='sm' >
                Invite Members
            </Button>
        </>
    )
}

export default InviteButton