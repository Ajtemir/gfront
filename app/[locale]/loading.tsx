'use client'

import SyncLoader from "@/components/sync-loader";

const Loading = () => (
  <SyncLoader
    loading={true}
    color='#7582EB'
    aria-label='Loading Spinner'
    style={{
      margin: 'auto'
    }}
  />
)

export default Loading