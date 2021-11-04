const useGenre = (selectedGenres) => {
  if (selectedGenres.length < 1) return "";

  const GenreIds = selectedGenres.map((g) => g.id);
  console.log(GenreIds.reduce((acc, curr) => acc + "," + curr)); //12,25,35 id lileri geri dondurer
  return GenreIds.reduce((acc, curr) => acc + "," + curr);
};

export default useGenre;
