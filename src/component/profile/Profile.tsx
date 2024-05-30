import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { IProfile } from "../../ProfileProp.types";
import { BASE_API_URL } from "../../utils/constant";
import axios from "axios";

const Profile = () => {
  const [isloading, setIsloading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [profileInfo, setProfileInfo] = useState<IProfile | null>(null);
  const [successMsg, setSuccesmessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IProfile>();
  useEffect(() => {
    const getProfileInfo = async () => {
      try {
        setIsloading(true);
        const { data } = await axios.get(`${BASE_API_URL}/profile`);
        setProfileInfo(data);
      } catch (err) {
        setErrorMsg("Error while getting Profile Information, Try again later");
      } finally {
        setIsloading(false);
      }
    };
    getProfileInfo();
  }, []);
  const onSubmit = async (data: IProfile) => {
    setErrorMsg("");
    try {
      await axios.patch(`${BASE_API_URL}/profile`, data);
      setSuccesmessage("Profile Updated successfully");
      setTimeout(() => {
        setSuccesmessage("");
      }, 2000);
    } catch (err) {
      setSuccesmessage("");
      setErrorMsg("Error updating Profile");
    }
  };

  useEffect(() => {
    reset({
      first_name: profileInfo?.first_name || "",
      last_name: profileInfo?.last_name || "",
      email: profileInfo?.email || "",
    });
  }, [profileInfo, reset]);
  return (
    <div className="main-content">
      <h2 className="my-3 text-center">Profile</h2>
      {isloading && <p className="loading">Loading ....</p>}
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
      {successMsg && <p className="success-msg">{successMsg}</p>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="first_name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            {...register("first_name", {
              required: true,
            })}
          />
          {errors.first_name && (
            <p className="error-msg">Please enter your first Name</p>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="last_name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            {...register("last_name", {
              required: true,
            })}
          />
          {errors.last_name && (
            <p className="error-msg">Please enter your last Name</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
            })}
          />
          {errors.email && <p className="error-msg">Please enter your Email</p>}
        </Form.Group>
        <Form.Group>
          <Button type="submit" variant="success">
            Update Profile
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Profile;
