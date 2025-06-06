/*!
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { useQueryClient } from "@tanstack/react-query";

import { useDagServiceDeleteDag } from "openapi/queries";
import { useDagServiceGetDagKey } from "openapi/queries";
import { toaster } from "src/components/ui";

const onError = () => {
  toaster.create({
    description: "Delete DAG request failed",
    title: "Failed to delete DAG",
    type: "error",
  });
};

export const useDeleteDag = ({
  dagId,
  onSuccessConfirm,
}: {
  dagId: string;
  onSuccessConfirm: () => void;
}) => {
  const queryClient = useQueryClient();

  const onSuccess = async () => {
    const queryKeys = [[useDagServiceGetDagKey, { dagId }]];

    await Promise.all(queryKeys.map((key) => queryClient.invalidateQueries({ queryKey: key })));

    toaster.create({
      description: "The DAG deletion request was successful.",
      title: "DAG Deleted Successfully",
      type: "success",
    });

    onSuccessConfirm();
  };

  return useDagServiceDeleteDag({
    onError,
    onSuccess,
  });
};
