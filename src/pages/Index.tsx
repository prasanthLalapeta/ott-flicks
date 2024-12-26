import { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { ImageUploader } from '../components/ImageUploader';
import MovieCard from '../components/MovieCard';
import { parseText, type MovieEntry } from '../utils/textParser';
import { fetchMovieDetails, type MovieDetails } from '../utils/omdbApi';
import { motion } from 'framer-motion';
import { useToast } from '../components/ui/use-toast';
import { Film } from 'lucide-react';

interface EnrichedMovieEntry extends MovieEntry {
  details?: MovieDetails;
}

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<EnrichedMovieEntry[]>([]);
  const { toast } = useToast();

  const processImage = async (file: File) => {
    setIsProcessing(true);
    setResults([]);

    try {
      const worker = await createWorker();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');

      const { data: { text } } = await worker.recognize(file);
      await worker.terminate();

      const entries = parseText(text);

      // Fetch additional details for each entry
      const enrichedEntries = await Promise.all(
        entries.map(async (entry) => {
          const details = await fetchMovieDetails(entry.title);
          return { ...entry, details };
        })
      );

      setResults(enrichedEntries);
      toast({
        title: "Success!",
        description: `Found ${enrichedEntries.length} titles in the image.`,
      });
    } catch (error) {
      console.error('Error processing image:', error);
      toast({
        title: "Error",
        description: "Failed to process the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Film className="w-10 h-10 text-red-600" />
            <h1 className="text-4xl font-bold text-red-600">
              OTT Flicks
            </h1>
          </div>
          <p className="text-lg text-gray-600 mb-8">
            Upload an image of upcoming OTT releases to view
            <div className="flex flex-wrap gap-2 justify-center mt-3">
              <span className="px-3 py-1 bg-gray-900 text-white rounded-md text-base font-semibold">
                movie titles
              </span>
              <span className="px-3 py-1 bg-[#F6C800] text-black rounded-md text-base font-bold">
                IMDb ratings
              </span>
              <span className="px-3 py-1 bg-gray-900 text-white rounded-md text-base font-semibold">
                streaming platforms
              </span>
            </div>
          </p>
        </motion.div>

        <div className="mb-12">
          <ImageUploader onImageUpload={processImage} />
        </div>

        {isProcessing && (
          <div className="text-center py-12">
            <div className="loading-shimmer w-12 h-12 rounded-full mx-auto mb-4" />
            <p className="text-gray-600">Processing image...</p>
          </div>
        )}

        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {results.map((entry, index) => (
              <MovieCard
                key={index}
                title={entry.title}
                type={entry.type}
                platform={entry.platform}
                language={entry.language}
                rating={entry.details?.imdbRating}
                votes={entry.details?.imdbVotes}
                year={entry.details?.Year}
                poster={entry.details?.Poster}
              />
            ))}
          </motion.div>
        )}

        <div className="text-center mt-12 text-sm text-gray-500">
          <p className="mb-2">
            Currently supporting images from{' '}
            <a
              href="https://x.com/hashtag/AKVOTT?src=hashtag_click"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Aakashavaani
            </a>
          </p>
          <p>
            Developed with ❤️ by{' '}
            <a
              href="https://x.com/heylalapeta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-700 font-medium"
            >
              @heylalapeta
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;