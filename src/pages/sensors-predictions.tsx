import { useState } from "react";
import { Card, CardBody, CardHeader, Button, Chip } from "@heroui/react";
import { useInfiniteQuery } from "@tanstack/react-query";

import DashboardLayout from "@/layouts/dashboard-layout";
import { useMachines, useInfinitePredictions } from "@/hooks/useApi";
import { sensorApi } from "@/services/sensors";

export default function SensorsPredictionsPage() {
  const [currentSensorPage, setCurrentSensorPage] = useState(0);
  const [currentPredictionPage, setCurrentPredictionPage] = useState(0);

  const { data: machinesData } = useMachines();

  // Infinite query for sensors
  const {
    data: infiniteSensorsData,
    fetchNextPage: fetchNextSensorPage,
    hasNextPage: hasNextSensorPage,
    isFetchingNextPage: isFetchingNextSensor,
  } = useInfiniteQuery({
    queryKey: ["sensors", "infinite"],
    queryFn: ({ pageParam }) =>
      sensorApi.getAll({ cursor: pageParam, limit: 10 }),
    getNextPageParam: (lastPage) => lastPage.pagination.nextCursor,
    initialPageParam: undefined as string | undefined,
  });

  // Infinite query for predictions
  const {
    data: infinitePredictionsData,
    fetchNextPage: fetchNextPredictionPage,
    hasNextPage: hasNextPredictionPage,
    isFetchingNextPage: isFetchingNextPrediction,
  } = useInfinitePredictions();

  const machines = machinesData?.allMachines || [];

  // Sensors pagination data
  const loadedSensorPages = infiniteSensorsData?.pages || [];
  const totalSensorPages = loadedSensorPages.length;
  const currentSensorData =
    loadedSensorPages[currentSensorPage]?.readings || [];

  // Predictions pagination data
  const loadedPredictionPages = infinitePredictionsData?.pages || [];
  const totalPredictionPages = loadedPredictionPages.length;
  const currentPredictionData =
    loadedPredictionPages[currentPredictionPage]?.predictions || [];

  // Handle sensor page navigation
  const handleSensorPageChange = (pageIndex: number) => {
    if (pageIndex >= totalSensorPages && hasNextSensorPage) {
      fetchNextSensorPage().then(() => setCurrentSensorPage(pageIndex));
    } else {
      setCurrentSensorPage(pageIndex);
    }
  };

  // Handle prediction page navigation
  const handlePredictionPageChange = (pageIndex: number) => {
    if (pageIndex >= totalPredictionPages && hasNextPredictionPage) {
      fetchNextPredictionPage().then(() => setCurrentPredictionPage(pageIndex));
    } else {
      setCurrentPredictionPage(pageIndex);
    }
  };

  return (
    <DashboardLayout
      subtitle="View and manage sensor readings and AI predictions"
      title="Sensors & Predictions"
    >
      <div className="container mx-auto max-w-7xl p-4 space-y-6">
        {/* Sensor Readings Table */}
        <Card>
          <CardHeader className="pb-3 px-6 pt-6">
            <h2 className="text-xl font-bold">Sensor Readings History</h2>
          </CardHeader>
          <CardBody className="px-6 pb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Machine
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Air Temp (K)
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Process Temp (K)
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                      RPM
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Torque (Nm)
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Tool Wear (min)
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Timestamp
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentSensorData.length === 0 ? (
                    <tr>
                      <td
                        className="text-center py-8 text-gray-500"
                        colSpan={7}
                      >
                        {totalSensorPages === 0
                          ? "Belum ada data sensor"
                          : "Loading..."}
                      </td>
                    </tr>
                  ) : (
                    currentSensorData.map((sensor: any) => (
                      <tr
                        key={sensor.readingId}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="py-3 px-4 text-sm font-medium">
                          {machines.find(
                            (m) => m.machineId === sensor.machineId,
                          )?.code || sensor.machineId}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {sensor.airTemperatureK.toFixed(1)}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {sensor.processTemperatureK.toFixed(1)}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {sensor.rotationalSpeedRpm}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {sensor.torqueNm.toFixed(1)}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {sensor.toolWearMin}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-500">
                          {new Date(sensor.timestamp).toLocaleString("id-ID", {
                            dateStyle: "medium",
                            timeStyle: "long",
                          })}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Sensor Pagination */}
            {totalSensorPages > 0 && (
              <div className="flex items-center justify-between mt-6 px-4">
                <div className="text-sm text-gray-500">
                  Showing page {currentSensorPage + 1}
                  {hasNextSensorPage ? "" : ` of ${totalSensorPages}`}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    isDisabled={currentSensorPage === 0}
                    size="sm"
                    variant="flat"
                    onPress={() => setCurrentSensorPage(currentSensorPage - 1)}
                  >
                    Previous
                  </Button>

                  <Button
                    isDisabled={
                      currentSensorPage >= totalSensorPages - 1 &&
                      !hasNextSensorPage
                    }
                    isLoading={
                      currentSensorPage >= totalSensorPages - 1 &&
                      isFetchingNextSensor
                    }
                    size="sm"
                    variant="flat"
                    onPress={() => {
                      if (currentSensorPage < totalSensorPages - 1) {
                        setCurrentSensorPage(currentSensorPage + 1);
                      } else if (hasNextSensorPage) {
                        handleSensorPageChange(currentSensorPage + 1);
                      }
                    }}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Predictions Table */}
        <Card>
          <CardHeader className="pb-3 px-6 pt-6">
            <h2 className="text-xl font-bold">Failure Predictions History</h2>
          </CardHeader>
          <CardBody className="px-6 pb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Machine
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Failure Type
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Confidence
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentPredictionData.length === 0 ? (
                    <tr>
                      <td
                        className="text-center py-8 text-gray-500"
                        colSpan={5}
                      >
                        {totalPredictionPages === 0
                          ? "Belum ada data prediksi"
                          : "Loading..."}
                      </td>
                    </tr>
                  ) : (
                    currentPredictionData.map((prediction) => (
                      <tr
                        key={prediction.predictionId}
                        className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="py-3 px-4 text-sm font-medium">
                          {machines.find(
                            (m) => m.machineId === prediction.machineId,
                          )?.code || prediction.machineId}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {prediction.failureType || "N/A"}
                        </td>
                        <td className="py-3 px-4">
                          <Chip
                            color={
                              prediction.failureType === "No Failure"
                                ? "success"
                                : "danger"
                            }
                            size="sm"
                            variant="flat"
                          >
                            {prediction.failureType === "No Failure"
                              ? "Normal"
                              : "Failed"}
                          </Chip>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {((prediction.confidenceScore || 0) * 100).toFixed(1)}
                          %
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-500 dark:text-gray-500">
                          {new Date(prediction.createdAt).toLocaleString(
                            "id-ID",
                            {
                              dateStyle: "medium",
                              timeStyle: "long",
                            },
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Predictions Pagination */}
            {totalPredictionPages > 0 && (
              <div className="flex items-center justify-between mt-6 px-4">
                <div className="text-sm text-gray-500">
                  Showing page {currentPredictionPage + 1}
                  {hasNextPredictionPage ? "" : ` of ${totalPredictionPages}`}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    isDisabled={currentPredictionPage === 0}
                    size="sm"
                    variant="flat"
                    onPress={() =>
                      setCurrentPredictionPage(currentPredictionPage - 1)
                    }
                  >
                    Previous
                  </Button>

                  <Button
                    isDisabled={
                      currentPredictionPage >= totalPredictionPages - 1 &&
                      !hasNextPredictionPage
                    }
                    isLoading={
                      currentPredictionPage >= totalPredictionPages - 1 &&
                      isFetchingNextPrediction
                    }
                    size="sm"
                    variant="flat"
                    onPress={() => {
                      if (currentPredictionPage < totalPredictionPages - 1) {
                        setCurrentPredictionPage(currentPredictionPage + 1);
                      } else if (hasNextPredictionPage) {
                        handlePredictionPageChange(currentPredictionPage + 1);
                      }
                    }}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}
