import confingPromise from '@payload-config';
import { getPayload } from 'payload';

export default async function Home() {
  const payload = await getPayload({
    config: confingPromise,
  })

  const data =  await payload.find({
    collection: "categories"
  })
  
  return (

    <div className="p-4">
      {JSON.stringify(data)}
    </div>
  
  );
}
