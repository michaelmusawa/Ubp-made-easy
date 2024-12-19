"use client";

import React, { useEffect, useMemo, useState } from "react";
import { data } from "./lib/data";
import { financeAct } from "./lib/data";
import { FinancialAct } from "./lib/definitions";
import Close from "@/components/icons/Close";

const BusinessFinancePage: React.FC = () => {
  const [search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredFinanceAct, setFilteredFinanceAct] = useState<FinancialAct[]>(
    []
  );
  const [selectedActivity, setSelectedActivity] = useState<{
    activity: string;
    activityCode: string;
    industry: string;
    industryCode: string;
    category: string;
    categoryCode: string;
    subCategory: string;
    subCategoryCode: string;
    trade: string;
  } | null>(null);

  // Flattened list of activities
  const activities = useMemo(() => {
    const flatActivities: {
      activity: string;
      activityCode: string;
      industry: string;
      industryCode: string;
      category: string;
      categoryCode: string;
      subCategory: string;
      subCategoryCode: string;
      trade: string;
    }[] = [];

    data.forEach((industry) => {
      industry.businesses.forEach((category) => {
        category.businessSubCategories.forEach((subCategory) => {
          subCategory.activities.forEach((activity) => {
            flatActivities.push({
              activity: activity.name,
              activityCode: activity.code,
              industry: industry.industryName,
              industryCode: industry.industryCode,
              category: category.businessCategoryName,
              categoryCode: category.businessCategoryCode,
              subCategory: subCategory.subCategoryName,
              subCategoryCode: subCategory.subCategoryCode,
              trade: activity.trade,
            });
          });
        });
      });
    });

    return flatActivities;
  }, []);

  // // Filter activities based on search value
  // const filteredActivities = useMemo(() => {
  //   return activities.filter((activity) =>
  //     activity.activity.toLowerCase().includes(searchValue.toLowerCase())
  //   );
  // }, [activities, searchValue]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Handle activity selection
  const handleSelectActivity = (activity: {
    activity: string;
    activityCode: string;
    industry: string;
    industryCode: string;
    category: string;
    categoryCode: string;
    subCategory: string;
    subCategoryCode: string;
    trade: string;
  }) => {
    setSelectedActivity(activity);
    setSearchValue(activity.activity);
  };

  useEffect(() => {
    if (selectedActivity) {
      const filteredData = financeAct.filter(
        (finance) => selectedActivity.trade === finance.NAICS
      );
      setFilteredFinanceAct(filteredData);
    }
  }, [selectedActivity]);

  console.log("selected activity", selectedActivity);

  return (
    <div className="p-4 max-w-screen-md mx-auto">
      {/* Business Activity Information */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Business Activity Information
        </h2>
        <div className="relative mb-6">
          <div className="flex items-center border border-gray-300 rounded-lg">
            {search ? (
              <div className="flex grow justify-between">
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder="Search or select an activity"
                  className="flex-1 p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
                <button
                  onClick={() => {
                    setSearch(false);
                    setSelectedActivity(null);
                    setFilteredFinanceAct([]);
                  }}
                  className="p-2"
                >
                  <Close className="w-5 md:w-6" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearch(true)}
                className="flex-1 p-2 text-start"
              >
                Search or select activity
              </button>
            )}
          </div>
          {search && !selectedActivity && (
            <ul className="absolute bg-white border border-gray-300 w-full max-h-40 overflow-auto rounded-lg shadow-lg z-10">
              {activities
                .filter((activity) =>
                  activity.activity
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
                )
                .map((activity, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectActivity(activity)}
                    className="p-2 hover:bg-blue-100 cursor-pointer"
                  >
                    {activity.activity}
                  </li>
                ))}
            </ul>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium">Industry Code</label>
            <input
              type="text"
              value={selectedActivity?.industryCode || ""}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
            />
            <p className="text-sm text-green-600">
              {selectedActivity?.industry}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium">
              Business Category
            </label>
            <input
              type="text"
              value={selectedActivity?.categoryCode || ""}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
            />
            <p className="text-sm text-green-600">
              {selectedActivity?.category}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium">
              Business SubCategory
            </label>
            <input
              type="text"
              value={selectedActivity?.subCategoryCode || ""}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
            />
            <p className="text-sm text-green-600">
              {selectedActivity?.subCategory}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium">
              Business Activity
            </label>
            <input
              type="text"
              value={selectedActivity?.activityCode || ""}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
            />
            <p className="text-sm text-green-600">
              {selectedActivity?.activity}
            </p>
          </div>
        </div>
      </div>

      {/* Finance Act */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Finance Act</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">
                Business Description
              </th>
              <th className="border border-gray-300 p-2">Code</th>
              <th className="border border-gray-300 p-2">Trade License</th>
              <th className="border border-gray-300 p-2">Fire Clearance</th>
              <th className="border border-gray-300 p-2">Food Hygiene</th>
              <th className="border border-gray-300 p-2">Health Certificate</th>
              <th className="border border-gray-300 p-2">Pest Control</th>
            </tr>
          </thead>
          <tbody>
            {filteredFinanceAct.length > 0 &&
              filteredFinanceAct.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{item.des}</td>
                  <td className="border border-gray-300 p-2">{item.code}</td>
                  <td className="border border-gray-300 p-2">
                    {item.trade.toLocaleString("en-US")}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.fire.toLocaleString("en-US")}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.food.toLocaleString("en-US")}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.health.toLocaleString("en-US")}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.pest.toLocaleString("en-US")}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BusinessFinancePage;
