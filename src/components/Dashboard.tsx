import {
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { postData } from "@libs/fetchApi";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export interface FormData {
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  p5: string;
  p6: string;
  p7: string;
  p8: string;
  p9: string;
  p10: string;
}

const featureNames: (keyof FormData)[] = [
  "p1",
  "p2",
  "p3",
  "p4",
  "p5",
  "p6",
  "p7",
  "p8",
  "p9",
  "p10",
];

const Dashboard = () => {
  const {
    register,
    handleSubmit,
  } = useForm<FormData>();
  const [predictedLevel, setPredictedLevel] = useState(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await postData({ ...data }, "/api/predict/");
      setPredictedLevel(response.predicted_levels[0]);
    } catch (error) {
      console.error("Error making prediction:", error);
    }
  };

  return (
    <div className="App">
      <h1>Stress Level Predictor</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          {featureNames.map((feature) => (
            <FormControl key={feature}>
              <FormLabel>{feature.toUpperCase()}</FormLabel>
              <RadioGroup
                name={feature}
                defaultValue="1"
                {...register(feature)}
              >
                <Stack direction="row">
                  <Radio value="1">1</Radio>
                  <Radio value="2">2</Radio>
                  <Radio value="3">3</Radio>
                  <Radio value="4">4</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          ))}
        </Stack>
        <Button mt={4} colorScheme="teal" type="submit">
          Predict
        </Button>
      </form>
      {predictedLevel && (
        <div>
          <h2>Predicted Stress Level: {predictedLevel}</h2>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
