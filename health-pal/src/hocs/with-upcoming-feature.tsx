import { useState } from 'react'

import AlertDialog from '@app/components/alert-dialog'

export const withUpcomingFeature = <P,>(WrappedComponent: React.ComponentType<P>) => {
  const WithUpcomingFeature = (props: P) => {
    const [open, setOpen] = useState(false)

    const handleShowNotice = () => {
      setOpen(true)
    }

    return (
      <>
        <WrappedComponent {...props} onPress={handleShowNotice} />

        <AlertDialog
          open={open}
          onOpenChange={setOpen}
          title="Coming Soon 🚧"
          description="This feature is under development. Please check back later!"
          onConfirm={() => setOpen(false)}
        />
      </>
    )
  }

  return WithUpcomingFeature
}
