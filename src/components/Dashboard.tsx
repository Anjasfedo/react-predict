import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
  Spinner,
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
    formState: { isSubmitting, errors },
  } = useForm<FormData>();
  const [predictedLevel, setPredictedLevel] = useState<string | null>(null);
  const [checkedValues, setCheckedValues] = useState<Record<string, string>>(
    {}
  );

  const onSubmit: SubmitHandler<FormData> = async () => {
    try {
      // Check if any checkbox is not selected
      if (Object.values(checkedValues).some((value) => value === "")) {
        return;
      }

      // Start the loading state
      setPredictedLevel(null);

      const response = await postData(
        {
          features_list: [
            Object.values(checkedValues).map((value) => parseInt(value)),
          ],
        },
        "/api/predict/"
      );
      setPredictedLevel(response.predicted_levels[0]);
    } catch (error) {
      console.error("Error making prediction:", error);
    }
  };

  const handleCheckboxChange = (feature: keyof FormData, value: string) => {
    setCheckedValues((prevCheckedValues) => ({
      ...prevCheckedValues,
      [feature]: value,
    }));
  };

  return (
    <div className="App">
      <h1>Stress Level Predictor</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          {featureNames.map((feature) => (
            <FormControl key={feature} isInvalid={!!errors[feature]}>
              <FormLabel>{feature.toUpperCase()}</FormLabel>
              <Stack direction="row">
                {[1, 2, 3, 4].map((value) => (
                  <Checkbox
                    key={value}
                    value={value.toString()}
                    {...register(feature, { required: true })}
                    isChecked={checkedValues[feature] === value.toString()}
                    onChange={() =>
                      handleCheckboxChange(feature, value.toString())
                    }
                  >
                    {value}
                  </Checkbox>
                ))}
              </Stack>
              <FormErrorMessage>
                {errors[feature]?.type === "required" &&
                  `${feature} is required`}
              </FormErrorMessage>
            </FormControl>
          ))}
        </Stack>
        <Button
          mt={4}
          colorScheme="teal"
          type="submit"
          isLoading={isSubmitting}
        >
          {isSubmitting ? <Spinner size="sm" color="white" /> : "Predict"}
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
