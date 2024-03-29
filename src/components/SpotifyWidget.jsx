import ReactCurvedText from "react-curved-text";
import { CgSpinner } from "react-icons/cg";
import { SiSpotify } from "react-icons/si";
import { clsxm } from "../../lib/utils";
import vinylImg from "../assets/images/vinyl-record.png";
import useLatestSong from "../hooks/useLatestSong";
import { CardHeader } from "./Card";

function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function PlayingSpotifyIcon({ className }) {
  return (
    <span className={clsxm("relative", className)}>
      <SiSpotify className="relative -mb-1 z-10 text-green-400" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <span className="-mb-1 z-[-1] relative block h-24 w-24 animate-ping-very-slow rounded-full bg-green-500/60"></span>
      </div>
    </span>
  );
}

function SpotifyIcon({ className }) {
  return <SiSpotify className={clsxm("-mb-1", className)} />;
}

export function SpotifyCardHeader({ playing }) {
  return (
    <CardHeader
      title={playing ? "Now playing" : "Last played"}
      icon={playing ? PlayingSpotifyIcon : SpotifyIcon}
    />
  );
}

export default function SpotifyWidget() {
  const { song, isLoading } = useLatestSong();

  // This does not recalculate on window
  // resize, but it's good enough for now
  const RADIUS_REM = 13;
  const RADIUS_PX = convertRemToPixels(RADIUS_REM);

  return (
    <>
      {isLoading && (
        <div className="h-full flex items-center justify-center">
          <CgSpinner className="text-white text-3xl animate-spin" />
        </div>
      )}

      {!isLoading && song && (
        // We include the header here because we need to
        // know if the song is playing or not
        <>
          <SpotifyCardHeader playing={song.isPlaying} />

          <div className="relative w-full h-full flex items-center justify-center py-24 md:py-20 md:pb-16">
            {/* Album cover */}
            {/* Not sure why but the md:mb-4 fixes the image alignment on the vynil */}
            <div className="flex flex-col justify-center items-center z-20 md:mb-4">
              <a href={song.url} target="_blank" rel="noreferrer">
                <img
                  src={song.images[0].url}
                  alt="album cover"
                  className={clsxm("w-24 h-24 rounded-sm", {
                    "animate-spin-very-slow": song.isPlaying,
                  })}
                />
              </a>
            </div>
            {/* Rotating text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div
                className={clsxm(song.isPlaying && "animate-spin-very-slow")}
              >
                <ReactCurvedText
                  width={RADIUS_PX}
                  height={RADIUS_PX}
                  cx={RADIUS_PX / 2}
                  cy={RADIUS_PX / 2}
                  rx={RADIUS_PX / 2}
                  ry={RADIUS_PX / 2}
                  text={`${song.name} • ${song.artists.join(", ")} 🎵`}
                  textProps={{
                    className: "text-sm uppercase font-mono",
                    fill: "white",
                  }}
                />
              </div>
            </div>
            {/* Vinyl */}
            <div className="flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full z-0">
              <img
                src={vinylImg}
                alt="vinyl"
                className={clsxm("w-64 h-auto", {
                  "animate-spin-very-slow": song.isPlaying,
                })}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
