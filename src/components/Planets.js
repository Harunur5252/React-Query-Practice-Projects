import React, { useState } from 'react'
import {useQuery,QueryClient,QueryClientProvider, usePaginatedQuery,} from 'react-query'
import Planet from './Planet'

const fetchPlanets = async (key,page) => {
    const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`)
    return await res.json()
}

function Planets() {
    const [page,setPage] = useState(1)
//   const {data,status} = useQuery(['planets','hello',page],fetchPlanets,{
//     staleTime:0, // manually change config staleTime(measure millisecond) for re-fetching
//     // cacheTime:10, // manually change config cacheTime(measure millisecond) for how many times data cached.
//     onSuccess:() => ('data fetched with no problem') // every re-fetching call this
//   })

  // best way for pagination
  const {resolvedData,latestData,status} = usePaginatedQuery(['planets',page],fetchPlanets)

  return (
    <div>
        <h2>Planets</h2>
        {/* <button onClick={() => setPage(1)}>Page 1</button>
        <button onClick={() => setPage(2)}>Page 2</button>
        <button onClick={() => setPage(3)}>Page 3</button> */}

        {status === 'loading' && (
            <div>Loading data....</div>
        )}

        {status === 'error' && (
            <div>Error fetching data</div>
        )}

        {status === 'success' && (
            <>
                <button disabled={page===1} onClick={() => setPage((old) => Math.max(old - 1 ,1))}>Previous Page</button>
                <span>{page}</span>
                <button disabled={!latestData || !latestData.next} onClick={() => setPage((old) => !latestData || !latestData.next ? old : old + 1)}>Next Page</button>
                <div>
                    {resolvedData?.results?.map(planet => <Planet key={planet?.name} planet={planet} />)}
                </div>
            </>
        )}
    </div>
  )
}

export default Planets