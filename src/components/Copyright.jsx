import React from 'react'

const Copyright = () => {
  return (
    <div className="container py-4 md:py-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Civix. All rights reserved.
          </p>
        </div>
  )
}

export default Copyright