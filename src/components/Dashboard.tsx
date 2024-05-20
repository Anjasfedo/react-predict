import { fetchData } from "@libs/fetchApi";
import { useQuery } from "react-query";

const fetchDashboardData = async () => {
  try {
    const data = await fetchData("/v1/posts/");

    return data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

const Dashboard = () => {
  const { data, isLoading, isError, error } = useQuery(
    "dashboardData",
    fetchDashboardData
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <h1>Dashboard</h1>
      {data.posts.map((post) => (
        <>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <img src={post.imageURL} alt="" />
        </>
      ))}
    </div>
  );
};

export default Dashboard;
