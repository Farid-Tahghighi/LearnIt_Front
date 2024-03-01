import { useEffect, useState } from "react";
import axios from "axios";
import ClassCard from "../components/Class/ClassCard";
import { Flex } from "@chakra-ui/react";

interface Subject {
  title: string;
  credit: number;
  resources: string[];
}

interface User {
  name: string;
}

interface Class {
  subject: Subject;
  presenter: User;
  startTime: Date;
  description: string;
  image: string;
  _id: string;
}

interface Props {
  search: string;
}

const Home = ({search}: Props) => {
  const [data, setData] = useState<Class[]>([]);
  if (search != "") {
    data.filter((c) => {
      return c.subject.title.includes(search);
    });
  }
  useEffect(() => {
    axios.get("http://localhost:3000/api/classes").then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <>
      <Flex
        flexDirection={"row"}
        flexWrap={"wrap"}
        alignItems={"center"}
        justify={"center"}
        mx={"5%"}
      >
        {data.map((c) => {
          return (
            <ClassCard
              w={["70%", "68%", "38%", "25%", "19%"]}
              key={c._id}
              subject={c.subject.title}
              teacher={c.presenter.name}
              startTime={c.startTime.toString()}
              image={
                "https://img.freepik.com/free-vector/chalkboard-with-math-elements_1411-88.jpg"
              }
              description={c.description}
              id={c._id}
            />
          );
        })}
      </Flex>
    </>
  );
};

export default Home;