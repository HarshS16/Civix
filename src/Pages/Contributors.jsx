import { useEffect, useState } from "react";
import { Github, ChevronDown, Search, Filter, Trophy, Star, GitBranch, Users, TrendingUp, Award, Medal, Crown } from "lucide-react";

const ContributorsPage = () => {
    const [contributors, setContributors] = useState([]);
    const [displayedContributors, setDisplayedContributors] = useState([]);
    const [filteredContributors, setFilteredContributors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("contributions");
    const [viewMode, setViewMode] = useState("grid");
    const [stats, setStats] = useState({
        totalContributors: 0,
        totalContributions: 0,
        topContributor: null
    });

    const CONTRIBUTORS_PER_PAGE = 12;

    useEffect(() => {
        const fetchContributors = async () => {
            try {
                const response = await fetch(
                    "https://api.github.com/repos/HarshS16/Civix/contributors?per_page=200"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch contributors");
                }

                const data = await response.json();
                const sortedData = (data || []).sort(
                    (a, b) => b.contributions - a.contributions
                );

                setContributors(sortedData);
                setFilteredContributors(sortedData);
                setDisplayedContributors(
                    sortedData.slice(0, CONTRIBUTORS_PER_PAGE)
                );
                setHasMore(sortedData.length > CONTRIBUTORS_PER_PAGE);
                
                // Calculate stats
                const totalContributions = sortedData.reduce((sum, c) => sum + c.contributions, 0);
                setStats({
                    totalContributors: sortedData.length,
                    totalContributions,
                    topContributor: sortedData[0]
                });
            } catch (err) {
                console.error(err);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContributors();
    }, []);

    useEffect(() => {
        let filtered = contributors.filter(contributor =>
            contributor.login.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Sort filtered results
        filtered.sort((a, b) => {
            if (sortBy === "contributions") return b.contributions - a.contributions;
            if (sortBy === "alphabetical") return a.login.localeCompare(b.login);
            return 0;
        });

        setFilteredContributors(filtered);
        setDisplayedContributors(filtered.slice(0, CONTRIBUTORS_PER_PAGE));
        setPage(1);
        setHasMore(filtered.length > CONTRIBUTORS_PER_PAGE);
    }, [searchTerm, sortBy, contributors]);

    const loadMoreContributors = () => {
        setIsLoadingMore(true);

        const nextPage = page + 1;
        const startIndex = page * CONTRIBUTORS_PER_PAGE;
        const endIndex = startIndex + CONTRIBUTORS_PER_PAGE;

        const newContributors = filteredContributors.slice(startIndex, endIndex);

        setTimeout(() => {
            setDisplayedContributors((prev) => [
                ...prev,
                ...newContributors,
            ]);
            setPage(nextPage);
            setHasMore(endIndex < filteredContributors.length);
            setIsLoadingMore(false);
        }, 500);
    };

    const getRankIcon = (index) => {
        if (index === 0) return <Crown className="w-5 h-5 text-yellow-500" />;
        if (index === 1) return <Medal className="w-5 h-5 text-gray-400" />;
        if (index === 2) return <Award className="w-5 h-5 text-amber-600" />;
        return null;
    };

    const getContributionLevel = (contributions) => {
        if (contributions >= 100) return { level: "Legend", color: "bg-purple-500", textColor: "text-purple-100" };
        if (contributions >= 50) return { level: "Expert", color: "bg-blue-500", textColor: "text-blue-100" };
        if (contributions >= 20) return { level: "Advanced", color: "bg-green-500", textColor: "text-green-100" };
        if (contributions >= 10) return { level: "Intermediate", color: "bg-yellow-500", textColor: "text-yellow-900" };
        return { level: "Beginner", color: "bg-gray-500", textColor: "text-gray-100" };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-slate-900 dark:to-emerald-950">
            <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 dark:from-emerald-800 dark:via-green-800 dark:to-teal-800">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative px-6 py-16 sm:py-24">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 tracking-tight">
                            Our Amazing
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300">
                                Contributors
                            </span>
                        </h1>
                        <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                            Meet the incredible developers who make Civix possible through their dedication and contributions
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                                <div className="flex items-center justify-center mb-2">
                                    <Users className="w-8 h-8 text-green-300" />
                                </div>
                                <div className="text-3xl font-bold text-white">{stats.totalContributors}</div>
                                <div className="text-green-200">Contributors</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                                <div className="flex items-center justify-center mb-2">
                                    <GitBranch className="w-8 h-8 text-emerald-300" />
                                </div>
                                <div className="text-3xl font-bold text-white">{stats.totalContributions}</div>
                                <div className="text-green-200">Total Contributions</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                                <div className="flex items-center justify-center mb-2">
                                    <TrendingUp className="w-8 h-8 text-teal-300" />
                                </div>
                                <div className="text-3xl font-bold text-white">
                                    {stats.topContributor?.contributions || 0}
                                </div>
                                <div className="text-green-200">Top Contributions</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search contributors..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        
                        <div className="flex gap-3">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                            >
                                <option value="contributions">Most Contributions</option>
                                <option value="alphabetical">Alphabetical</option>
                            </select>
                            
                            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`px-4 py-2 rounded-lg transition-colors ${
                                        viewMode === "grid" 
                                            ? "bg-white dark:bg-gray-600 shadow-sm text-emerald-600 dark:text-emerald-400" 
                                            : "text-gray-600 dark:text-gray-300"
                                    }`}
                                >
                                    Grid
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`px-4 py-2 rounded-lg transition-colors ${
                                        viewMode === "list" 
                                            ? "bg-white dark:bg-gray-600 shadow-sm text-emerald-600 dark:text-emerald-400" 
                                            : "text-gray-600 dark:text-gray-300"
                                    }`}
                                >
                                    List
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-pulse"
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full" />
                                    <div className="flex-1">
                                        <div className="w-32 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
                                        <div className="w-20 h-3 bg-gray-300 dark:bg-gray-600 rounded" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : isError ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🚨</div>
                        <p className="text-red-600 dark:text-red-400 text-xl font-semibold mb-2">
                            Oops! Something went wrong
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            We couldn't load the contributors. Please try again later.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
                            {displayedContributors.map((user, index) => {
                                const contributionLevel = getContributionLevel(user.contributions);
                                const rank = contributors.findIndex(c => c.login === user.login);
                                
                                return (
                                    <div
                                        key={user.login}
                                        className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden ${
                                            viewMode === "list" ? "flex items-center p-6" : "p-6"
                                        }`}
                                    >
                                        {rank < 3 && (
                                            <div className="absolute top-4 right-4 z-10">
                                                {getRankIcon(rank)}
                                            </div>
                                        )}
                                        
                                        {rank === 0 && (
                                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-400/10 dark:from-yellow-400/5 dark:to-orange-400/5"></div>
                                        )}
                                        
                                        <div className={`relative z-10 ${viewMode === "list" ? "flex items-center w-full" : "text-center"}`}>
                                            <div className={`${viewMode === "list" ? "flex items-center space-x-4 flex-1" : ""}`}>
                                                <div className="relative">
                                                    <img
                                                        src={user.avatar_url}
                                                        alt={user.login}
                                                        className={`rounded-full border-3 shadow-lg transition-transform group-hover:scale-105 ${
                                                            viewMode === "list" ? "w-16 h-16" : "w-20 h-20 mx-auto mb-4"
                                                        } ${rank === 0 ? "border-yellow-400" : rank === 1 ? "border-gray-400" : rank === 2 ? "border-amber-600" : "border-blue-400 dark:border-blue-500"}`}
                                                    />
                                                    {rank < 3 && (
                                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
                                                            <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                                                                #{rank + 1}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                <div className={viewMode === "list" ? "flex-1" : ""}>
                                                    <h3 className={`font-bold text-gray-800 dark:text-white ${viewMode === "list" ? "text-lg" : "text-xl mb-2"}`}>
                                                        @{user.login}
                                                    </h3>
                                                    
                                                    <div className={`flex items-center gap-2 ${viewMode === "list" ? "mb-2" : "justify-center mb-4"}`}>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${contributionLevel.color} ${contributionLevel.textColor}`}>
                                                            {contributionLevel.level}
                                                        </span>
                                                        <span className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                                                            {user.contributions} contributions
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <a
                                                href={user.html_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                                                    viewMode === "list" ? "ml-4" : "w-full justify-center"
                                                }`}
                                            >
                                                <Github className="w-5 h-5" />
                                                View Profile
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {hasMore && (
                            <div className="flex justify-center mt-12">
                                <button
                                    onClick={loadMoreContributors}
                                    disabled={isLoadingMore}
                                    className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
                                >
                                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                                    <div className="relative flex items-center gap-3">
                                        {isLoadingMore ? (
                                            <>
                                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Loading more amazing contributors...
                                            </>
                                        ) : (
                                            <>
                                                <ChevronDown className="w-6 h-6" />
                                                Show More Contributors
                                            </>
                                        )}
                                    </div>
                                </button>
                            </div>
                        )}

                        {isLoadingMore && (
                            <div className={`grid gap-6 mt-8 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <div
                                        key={`loading-${index}`}
                                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 animate-pulse"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full" />
                                            <div className="flex-1">
                                                <div className="w-32 h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
                                                <div className="w-20 h-3 bg-gray-300 dark:bg-gray-600 rounded" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {filteredContributors.length === 0 && searchTerm && (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">🔍</div>
                                <p className="text-gray-600 dark:text-gray-400 text-xl mb-2">
                                    No contributors found
                                </p>
                                <p className="text-gray-500 dark:text-gray-500">
                                    Try adjusting your search terms
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ContributorsPage;