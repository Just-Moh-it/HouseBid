import { useRouter } from "next/router";
import useSWR from "swr";
import axios from "axios";

export const fetcher = (url) => axios.get(url).then((res) => res.data);

const Success = () => {
  const {
    query: { session_id },
  } = useRouter();
  const { data, error } = useSWR(
    () => `/api/checkout_sessions/${session_id}`,
    fetcher
  );

  console.log(data)

  return (
    <div>
      Success!! {JSON.stringify(data, 2, null)} {JSON.stringify(error, 2, null)}
    </div>
  );
};

export default Success;
