import { StreamInfo, StudentDetails } from '@/types/student';

/**
 * Returns streams relevant to the student's HSC stream.
 * If no HSC stream is set, returns all streams.
 */
export const getFilteredStreams = (
  allStreams: StreamInfo[],
  studentDetails: StudentDetails
): StreamInfo[] => {
  const { hscStream } = studentDetails;

  if (!hscStream) return allStreams;

  // Map HSC stream to relevant stream IDs
  const streamMap: Record<string, string[]> = {
    science: ['engineering', 'medical', 'science', 'creative'],
    commerce: ['commerce', 'arts', 'creative'],
    arts: ['arts', 'creative', 'commerce'],
  };

  const relevantIds = streamMap[hscStream] || [];
  if (relevantIds.length === 0) return allStreams;

  return allStreams.filter((s) => relevantIds.includes(s.id));
};
