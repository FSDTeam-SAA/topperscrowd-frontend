"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Headphones,
  Clock,
  Heart,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ListMusic,
  Star,
  Loader2,
} from "lucide-react";
import {
  useLibraryStats,
  useContinueListening,
  useRecentPurchases,
  useMyBooks,
} from "../hooks/useLibrary";
import { LibraryBook } from "../types/library.types";

function StatusBadge({ status }: { status: "done" | "reading" | "wishlist" }) {
  const styles = {
    done: "bg-[#2ea915]",
    reading: "bg-indigo-600",
    wishlist: "bg-rose-600",
  };
  const labels = {
    done: "Done",
    reading: "Reading",
    wishlist: "Wishlist",
  };

  return (
    <span
      className={`inline-flex items-center rounded px-3 py-1.5 text-xs font-medium text-white ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function BookCardComponent({ book }: { book: LibraryBook }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0px_4px_24px_0px_rgba(15,23,42,0.06)]">
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={book.image?.secure_url || "/images/home/book1.png"}
          alt={book.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <h4 className="text-sm font-semibold text-slate-900 leading-tight">
          {book.title}
        </h4>
        <p className="text-xs text-slate-500 mt-0.5">{book.author}</p>
        <div className="mt-1.5 flex items-center gap-1">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span className="text-xs font-medium text-slate-500">
            {book.averageRating?.toFixed(1) || "0.0"}
          </span>
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function formatListeningTime(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

export default function MyLibraryTab() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [myBooksPage, setMyBooksPage] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const { data: statsData, isLoading: statsLoading } = useLibraryStats();
  const { data: continueData, isLoading: continueLoading } =
    useContinueListening();
  const { data: recentData, isLoading: recentLoading } = useRecentPurchases();
  const { data: myBooksData, isLoading: myBooksLoading } = useMyBooks(
    myBooksPage,
    10,
  );

  const stats = statsData?.data;
  const continueListening = continueData?.data;
  const recentPurchases = recentData?.data || [];
  const myBooks = myBooksData?.data || [];
  const pagination = myBooksData?.pagination;

  const audioUrl = continueListening?.book.audio?.secure_url;

  // Initialize audio element when audioUrl changes
  useEffect(() => {
    if (!audioUrl) return;

    const audio = new Audio(audioUrl);
    audioRef.current = audio;

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
      // Seek to saved progress
      if (continueListening?.progress) {
        audio.currentTime = continueListening.progress;
      }
    });

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
    });

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", () => {});
      audio.removeEventListener("timeupdate", () => {});
      audio.removeEventListener("ended", () => {});
      audio.src = "";
    };
  }, [audioUrl, continueListening?.progress]);

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const skipForward = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 15);
  }, []);

  const skipBackward = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, audio.currentTime - 15);
  }, []);

  const cyclePlaybackRate = useCallback(() => {
    const rates = [1, 1.25, 1.5, 1.75, 2, 0.75];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  }, [playbackRate]);

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const audio = audioRef.current;
      const bar = progressBarRef.current;
      if (!audio || !bar) return;

      const rect = bar.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percent = clickX / rect.width;
      audio.currentTime = percent * audio.duration;
    },
    [],
  );

  const displayCurrentTime = currentTime || continueListening?.progress || 0;
  const displayDuration = duration || continueListening?.totalDuration || 0;
  const progressPercent =
    displayDuration > 0 ? (displayCurrentTime / displayDuration) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Title */}
      <h1 className="text-4xl font-bold text-slate-900 font-serif">
        My Library
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Total Audiobooks */}
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
              <Headphones className="h-[18px] w-[18px] text-indigo-600" />
            </div>
          </div>
          <p className="text-base text-slate-500">Total Audiobooks</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {statsLoading ? (
              <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
            ) : (
              (stats?.totalAudiobooks ?? 0)
            )}
          </p>
        </div>

        {/* Listening Time */}
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
              <Clock className="h-[18px] w-[18px] text-orange-600" />
            </div>
          </div>
          <p className="text-base text-slate-500">Listening Time</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {statsLoading ? (
              <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
            ) : (
              formatListeningTime(stats?.totalListeningTime ?? 0)
            )}
          </p>
        </div>

        {/* Favorites */}
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-50">
              <Heart className="h-[18px] w-[18px] text-rose-600" />
            </div>
          </div>
          <p className="text-base text-slate-500">Favorites</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">
            {statsLoading ? (
              <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
            ) : (
              (stats?.favorites ?? 0)
            )}
          </p>
        </div>
      </div>

      {/* Continue Listening */}
      <div className="space-y-3">
        <h2 className="text-2xl font-bold text-slate-900 font-serif">
          Continue Listening
        </h2>
        {continueLoading ? (
          <div className="flex items-center justify-center rounded-lg border border-slate-200 bg-white p-12">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          </div>
        ) : continueListening ? (
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <div className="flex gap-4 items-center">
              {/* Book Cover */}
              <div className="relative h-[120px] w-[100px] shrink-0 overflow-hidden rounded-md">
                <Image
                  src={
                    continueListening.book.image?.secure_url ||
                    "/images/home/book1.png"
                  }
                  alt={continueListening.book.title}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Book Info */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-slate-900 font-serif">
                  {continueListening.book.title}
                </h3>
                <div className="space-y-2">
                  <p className="text-base text-slate-500">
                    {continueListening.book.author}
                  </p>
                </div>
              </div>
            </div>

            {/* Player Controls */}
            <div className="mt-8 space-y-6">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div
                  ref={progressBarRef}
                  onClick={handleProgressClick}
                  className="relative h-[5px] w-full cursor-pointer rounded-full bg-slate-200"
                >
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-indigo-600"
                    style={{ width: `${progressPercent}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 h-[15px] w-[15px] rounded-full bg-indigo-600"
                    style={{ left: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base text-slate-400">
                    {formatTime(Math.floor(displayCurrentTime))}
                  </span>
                  <span className="text-base text-slate-400">
                    {formatTime(Math.floor(displayDuration))}
                  </span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <button
                  onClick={cyclePlaybackRate}
                  className="rounded-md border border-slate-200 bg-[#fff8f5] px-3 py-1.5 text-xs font-semibold text-slate-500"
                >
                  {playbackRate}x
                </button>
                <button
                  onClick={skipBackward}
                  className="flex items-center justify-center"
                >
                  <SkipBack className="h-6 w-6 text-slate-700" />
                </button>
                <button
                  onClick={togglePlayPause}
                  disabled={!audioUrl}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5 ml-0.5" />
                  )}
                </button>
                <button
                  onClick={skipForward}
                  className="flex items-center justify-center"
                >
                  <SkipForward className="h-5 w-5 text-slate-700" />
                </button>
                <button className="flex items-center justify-center">
                  <ListMusic className="h-6 w-6 text-slate-700" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
            <p className="text-slate-500">
              No audiobook in progress. Start listening to a book!
            </p>
          </div>
        )}
      </div>

      {/* Recent Purchases */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 font-serif">
          Recent Purchases
        </h2>
        {recentLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          </div>
        ) : recentPurchases.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {recentPurchases.map((book) => (
              <BookCardComponent key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
            <p className="text-slate-500">No purchases yet.</p>
          </div>
        )}
      </div>

      {/* My Books */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 font-serif">
          My Books
        </h2>
        {myBooksLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          </div>
        ) : myBooks.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {myBooks.map((book) => (
                <div key={book._id} className="space-y-2.5">
                  <BookCardComponent book={book} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-4">
                <button
                  onClick={() =>
                    setMyBooksPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={myBooksPage === 1}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-sm text-slate-500">
                  Page {myBooksPage} of {pagination.totalPages}
                </span>
                <button
                  onClick={() =>
                    setMyBooksPage((prev) =>
                      Math.min(pagination.totalPages, prev + 1),
                    )
                  }
                  disabled={myBooksPage === pagination.totalPages}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
            <p className="text-slate-500">No books in your library yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
