"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Image as ImageIcon,
  Plus,
  X,
  Trash2,
  Edit,
  Sparkles,
  Bookmark,
} from "lucide-react";
import { useGetAllCovers, useDeleteCover } from "../hooks/useCoverManagement";
import { Cover } from "../api/coverManagement.api";
import CreateCoverForm from "./CreateCoverForm";
import UpdateCoverForm from "./UpdateCoverForm";
import { toast } from "sonner";

export default function CoverManagement() {
  const [page, setPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [coverToUpdate, setCoverToUpdate] = useState<Cover | null>(null);

  const { data, isLoading } = useGetAllCovers(page, 10);
  const { mutate: deleteCover } = useDeleteCover();

  const handleDelete = (id: string) => {
    // if (confirm("Are you sure you want to delete this cover?")) {
    deleteCover(id, {
      onSuccess: () => {
        toast.success("Cover deleted successfully");
      },
      onError: (error: unknown) => {
        const err = error as { response?: { data?: { message?: string } } };
        toast.error(err?.response?.data?.message || "Failed to delete cover");
      },
    });
    // }
  };

  const covers = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-serif flex items-center gap-3">
            <Sparkles className="size-8 text-indigo-600" />
            Cover Management
          </h1>
          <p className="text-slate-500 mt-1">
            Manage book covers, edition numbers, and descriptions shown in the
            Hero section.
          </p>
        </div>
        <button
          disabled={covers.length >= 1}
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-sm active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 disabled:active:scale-100"
          title={
            covers.length >= 1
              ? "Maximum of 1 cover is allowed. Update or delete the current cover to make changes."
              : "Add Cover"
          }
        >
          <Plus className="size-5" />
          Add Cover
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-600">
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Edition</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    Loading covers...
                  </td>
                </tr>
              ) : covers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No covers found.
                  </td>
                </tr>
              ) : (
                covers.map((cover) => (
                  <tr
                    key={cover._id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      {cover.image?.url ? (
                        <div className="relative h-16 w-12 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                          <Image
                            src={cover.image.url}
                            alt={cover.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-16 w-12 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-400">
                          <ImageIcon className="size-5" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-900 text-sm">
                        {cover.title}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600 line-clamp-2 max-w-xs">
                        {cover.description}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
                        <Bookmark className="size-3.5" />
                        {cover.edition}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setCoverToUpdate(cover)}
                          className="p-1.5 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Cover"
                        >
                          <Edit className="size-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(cover._id)}
                          className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Cover"
                        >
                          <Trash2 className="size-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {meta && meta.totalPage > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
            <span className="text-sm text-slate-500">
              Showing page {meta.page} of {meta.totalPage}
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors cursor-pointer"
              >
                Previous
              </button>
              <button
                disabled={page === meta.totalPage}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Cover Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-50 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 text-slate-400 bg-white rounded-full shadow-sm hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>
            <CreateCoverForm onSuccessAction={() => setIsAddModalOpen(false)} />
          </div>
        </div>
      )}

      {/* Update Cover Modal */}
      {coverToUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-50 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setCoverToUpdate(null)}
              className="absolute top-4 right-4 z-10 p-2 text-slate-400 bg-white rounded-full shadow-sm hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>
            <UpdateCoverForm
              cover={coverToUpdate}
              onSuccessAction={() => setCoverToUpdate(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
