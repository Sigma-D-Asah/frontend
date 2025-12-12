import {
  Card,
  CardBody,
  CardHeader,
  Select,
  SelectItem,
  Chip,
  Button,
} from "@heroui/react";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import DashboardLayout from "@/layouts/dashboard-layout";
import {
  useMachines,
  useFailurePredictions,
  useTickets,
  useInfinitePredictions,
} from "@/hooks/useApi";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function ReportingPage() {
  const [timeRange, setTimeRange] = useState("7");
  const [currentPage, setCurrentPage] = useState(0);

  const { data: machinesData } = useMachines();
  const { data: predictionsData } = useFailurePredictions({ limit: 1000 });
  const { data: ticketsData } = useTickets({ limit: 1000 });
  const {
    data: infinitePredictionsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePredictions();

  const machines = machinesData?.allMachines || [];
  const predictions = predictionsData?.predictions || [];
  const tickets = ticketsData?.tickets || [];

  // Get all loaded pages
  const loadedPages = infinitePredictionsData?.pages || [];
  const totalLoadedPages = loadedPages.length;

  // Current page data
  const currentPageData = loadedPages[currentPage]?.predictions || [];

  // Handle page navigation
  const handlePageChange = (pageIndex: number) => {
    // If page is not loaded yet, fetch it
    if (pageIndex >= totalLoadedPages && hasNextPage) {
      fetchNextPage().then(() => setCurrentPage(pageIndex));
    } else {
      setCurrentPage(pageIndex);
    }
  };

  // Machine Type Distribution
  const machineTypeData = [
    {
      name: "High Risk",
      value: machines.filter((m) => m.type === "H").length,
    },
    {
      name: "Medium Risk",
      value: machines.filter((m) => m.type === "M").length,
    },
    { name: "Low Risk", value: machines.filter((m) => m.type === "L").length },
  ];

  // Failure Predictions by Type
  const failureTypeData = predictions
    .filter((p) => p.isFailure && p.failureType)
    .reduce(
      (acc, p) => {
        const type = p.failureType || "Unknown";

        acc[type] = (acc[type] || 0) + 1;

        return acc;
      },
      {} as Record<string, number>,
    );

  const failureChartData = Object.entries(failureTypeData).map(
    ([name, value]) => ({
      name,
      count: value,
    }),
  );

  // Ticket Status Distribution
  const ticketStatusData = [
    { name: "Open", value: tickets.filter((t) => t.status === "OPEN").length },
    {
      name: "Assigned",
      value: tickets.filter((t) => t.status === "ASSIGNED").length,
    },
    {
      name: "In Progress",
      value: tickets.filter((t) => t.status === "IN_PROGRESS").length,
    },
    {
      name: "Resolved",
      value: tickets.filter((t) => t.status === "RESOLVED").length,
    },
    {
      name: "Closed",
      value: tickets.filter((t) => t.status === "CLOSED").length,
    },
  ];

  // Machine Health Scores
  const healthScoreData = machines
    .filter((m) => m.metadata?.healthScore)
    .map((m) => ({
      name: m.code,
      score: m.metadata?.healthScore || 0,
    }));

  // Prediction Confidence Over Time (last 10)
  const confidenceData = predictions.slice(0, 10).map((p, idx) => ({
    id: idx + 1,
    confidence: ((p.confidenceScore || 0) * 100).toFixed(1),
    failure: p.isFailure ? "Yes" : "No",
  }));

  return (
    <DashboardLayout
      subtitle="Analytics and visualizations for further insights"
      title="Reporting & Analytics"
    >
      <div className="container mx-auto max-w-7xl p-4">
        {/* Controls */}
        <div className="mb-6 flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <Select
              className="w-48"
              label="Time Range"
              selectedKeys={[timeRange]}
              size="sm"
              onSelectionChange={(keys) =>
                setTimeRange(Array.from(keys)[0] as string)
              }
            >
              <SelectItem key="7">Last 7 Days</SelectItem>
              <SelectItem key="30">Last 30 Days</SelectItem>
              <SelectItem key="90">Last 90 Days</SelectItem>
            </Select>
          </div>

          <div className="flex gap-3">
            <Chip color="primary" variant="flat">
              {machines.length} Machines
            </Chip>
            <Chip color="warning" variant="flat">
              {predictions.filter((p) => p.isFailure).length} Failures
            </Chip>
            <Chip color="success" variant="flat">
              {tickets.length} Tickets
            </Chip>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Machine Type Distribution */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold">Machine Risk Distribution</h3>
            </CardHeader>
            <CardBody>
              <ResponsiveContainer height={300} width="100%">
                <PieChart>
                  <Pie
                    cx="50%"
                    cy="50%"
                    data={machineTypeData}
                    dataKey="value"
                    fill="#8884d8"
                    label={(entry) => `${entry.name}: ${entry.value}`}
                    nameKey="name"
                  >
                    {machineTypeData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>

          {/* Failure Types */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold">Failure Types Breakdown</h3>
            </CardHeader>
            <CardBody>
              {failureChartData.length > 0 ? (
                <ResponsiveContainer height={300} width="100%">
                  <BarChart data={failureChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#FF8042" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-500">
                  No failure data available
                </div>
              )}
            </CardBody>
          </Card>

          {/* Machine Health Scores */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold">Machine Health Scores</h3>
            </CardHeader>
            <CardBody>
              {healthScoreData.length > 0 ? (
                <ResponsiveContainer height={300} width="100%">
                  <BarChart data={healthScoreData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="score" fill="#00C49F" name="Health Score" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-500">
                  No health score data available
                </div>
              )}
            </CardBody>
          </Card>

          {/* Ticket Status */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold">Ticket Status Distribution</h3>
            </CardHeader>
            <CardBody>
              {ticketStatusData.some((d) => d.value > 0) ? (
                <ResponsiveContainer height={300} width="100%">
                  <PieChart>
                    <Pie
                      cx="50%"
                      cy="50%"
                      data={ticketStatusData.filter((d) => d.value > 0)}
                      dataKey="value"
                      fill="#8884d8"
                      label={(entry) => `${entry.name}: ${entry.value}`}
                      nameKey="name"
                    >
                      {ticketStatusData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-500">
                  No ticket data available
                </div>
              )}
            </CardBody>
          </Card>

          {/* Prediction Confidence Trend */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <h3 className="text-lg font-bold">
                Recent Prediction Confidence Levels
              </h3>
            </CardHeader>
            <CardBody>
              {confidenceData.length > 0 ? (
                <ResponsiveContainer height={300} width="100%">
                  <LineChart data={confidenceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="id" label={{ value: "Prediction #" }} />
                    <YAxis domain={[0, 100]} label={{ angle: -90 }} />
                    <Tooltip />
                    <Legend />
                    <Line
                      dataKey="confidence"
                      name="Confidence %"
                      stroke="#8884d8"
                      strokeWidth={2}
                      type="monotone"
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-500">
                  No prediction data available
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardBody className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {machines.length}
              </div>
              <div className="text-sm text-gray-500 mt-1">Total Machines</div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="text-center">
              <div className="text-3xl font-bold text-red-600">
                {predictions.filter((p) => p.isFailure).length}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Predicted Failures
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="text-center">
              <div className="text-3xl font-bold text-yellow-600">
                {tickets.filter((t) => t.status === "IN_PROGRESS").length}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Active Maintenance
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {(predictions.filter((p) => !p.isFailure).length /
                  predictions.length) *
                  100 || 0}
                %
              </div>
              <div className="text-sm text-gray-500 mt-1">Healthy Rate</div>
            </CardBody>
          </Card>
        </div>

        {/* All Predictions Table */}
        <Card className="mt-6">
          <CardHeader className="pb-3">
            <h2 className="text-xl font-bold">All Predictions History</h2>
          </CardHeader>
          <CardBody>
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
                  {currentPageData.length === 0 ? (
                    <tr>
                      <td
                        className="text-center py-8 text-gray-500"
                        colSpan={5}
                      >
                        {totalLoadedPages === 0
                          ? "Belum ada data prediksi"
                          : "Loading..."}
                      </td>
                    </tr>
                  ) : (
                    currentPageData.map((prediction) => (
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
                              timeStyle: "short",
                            },
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalLoadedPages > 0 && (
              <div className="flex items-center justify-between mt-6 px-4">
                <div className="text-sm text-gray-500">
                  Page {currentPage + 1}
                  {hasNextPage ? "+" : ` of ${totalLoadedPages}`}
                </div>

                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <Button
                    isDisabled={currentPage === 0}
                    size="sm"
                    variant="flat"
                    onPress={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </Button>

                  {/* Page Numbers */}
                  <div className="flex gap-1">
                    {Array.from({ length: totalLoadedPages }, (_, i) => (
                      <Button
                        key={i}
                        color={currentPage === i ? "primary" : "default"}
                        size="sm"
                        variant={currentPage === i ? "solid" : "flat"}
                        onPress={() => setCurrentPage(i)}
                      >
                        {i + 1}
                      </Button>
                    ))}

                    {/* Next page indicator if hasNextPage */}
                    {hasNextPage && (
                      <Button
                        color="default"
                        isLoading={isFetchingNextPage}
                        size="sm"
                        variant="flat"
                        onPress={() => handlePageChange(totalLoadedPages)}
                      >
                        {totalLoadedPages + 1}
                      </Button>
                    )}
                  </div>

                  {/* Next Button */}
                  <Button
                    isDisabled={
                      currentPage >= totalLoadedPages - 1 && !hasNextPage
                    }
                    isLoading={
                      currentPage >= totalLoadedPages - 1 && isFetchingNextPage
                    }
                    size="sm"
                    variant="flat"
                    onPress={() => {
                      if (currentPage < totalLoadedPages - 1) {
                        setCurrentPage(currentPage + 1);
                      } else if (hasNextPage) {
                        handlePageChange(currentPage + 1);
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
