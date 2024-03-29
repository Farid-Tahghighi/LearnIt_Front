import Information from "../components/Profile/Information";
import Button from "../components/Button";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../components/FormInput";
import { Flex, Text } from "@chakra-ui/react";
import EditProfileSelect from "../components/Profile/EditProfileSelect";
import { useEffect, useState } from "react";
import { editCurrentUser, getCurrentUser } from "../api/services/user.service";

const schema = z.object({
  name: z.string().min(2),
  age: z.number().min(6),
  gender: z.enum(["Male", "Female", "Not Set"]),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address." }),
  description: z.string().min(20).max(150).optional(),
});
interface User {
  name: string;
  age: number;
  email: string;
  description: string;
  gender: string;
}
type FormData = z.infer<typeof schema>;

const EditProfile = () => {
  const [user, setUser] = useState<User>(Object);

  useEffect(() => {
    getCurrentUser()
      ?.then((res) => setUser(res))
      .catch((e) => {
        console.log("SOMETHING WENT WRONG! " + e);
      });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => editCurrentUser(data, user.email);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex w={"100%"} px={"10%"} direction={["column", "column", "row"]}>
        <EditProfileSelect />
        <Information>
          <FormInput
            type="text"
            label="Name"
            register={register}
            placeholder={user.name}
          ></FormInput>
          <FormInput
            type="number"
            label="Age"
            register={register}
            valueAsNumber={true}
            placeholder={user.age + ""}
          ></FormInput>
          <FormInput
            type="string"
            label="Gender"
            register={register}
            placeholder={user.gender}
          ></FormInput>
          <FormInput
            type="email"
            label="Email"
            register={register}
            placeholder={user.email}
          ></FormInput>
          {errors.name && <Text color={"red"}>{errors.name.message}</Text>}
          {errors.email && <Text color={"red"}>{errors.email.message}</Text>}
          {errors.age && <Text color={"red"}>{errors.age.message}</Text>}
          {errors.description && (
            <Text color={"red"}>{errors.description.message}</Text>
          )}
          {errors.gender && <Text color={"red"}>{errors.gender.message}</Text>}
          <Button type="submit">Edit</Button>
        </Information>
      </Flex>
    </form>
  );
};

export default EditProfile;
