// deno-lint-ignore-file
const input = await Deno.readTextFile('./input.txt');
const testInput = await Deno.readTextFile('./testInput.txt');

const createNew = (name, isDirectory, size, children, parent) => {
  return {
    name,
    isDirectory,
    size,
    children,
    parent,
  };
};

const getFileSystem = (input) => {
  const commands = input.split('\n');
  let fileSystem;
  let currentDirectory = fileSystem;
  let currentInstruction;

  commands.map((command, index) => {
    const commandSplitByWord = command.split(' ');

    // command is an instruction
    if (commandSplitByWord[0] === '$') {
      const instruction = commandSplitByWord[1];
      currentInstruction = instruction;
    }

    // command is a move bewteen directories
    if (currentInstruction === 'cd') {
      // command is a move backwards to parent directory
      if (commandSplitByWord.includes('..')) {
        currentDirectory = currentDirectory.parent;
      }

      // command is a move forward to child directory
      if (!commandSplitByWord.includes('..')) {
        const directoryName = commandSplitByWord[2];

        // there is a parent directory
        if (currentDirectory) {
          if (
            !currentDirectory.children.find(
              (child) => child.name === directoryName
            )
          ) {
            const newElement = createNew(
              directoryName,
              true,
              0,
              [],
              currentDirectory
            );
            currentDirectory.children = [
              ...currentDirectory.children,
              newElement,
            ];
          }
          currentDirectory = currentDirectory.children.find(
            (directory) =>
              directory.isDirectory && directory.name === directoryName
          );
        } else {
          // there is no parent directory yet, create /
          const newElement = createNew(directoryName, true, 0, [], null);
          fileSystem = newElement;
          currentDirectory = fileSystem;
        }
      }
    }

    // command is list
    if (currentInstruction === 'ls') {
      const detailedLine = command.split(' ');

      // indicates a child directory
      if (detailedLine[0] === 'dir') {
        const directoryName = detailedLine[1];
        if (
          currentDirectory &&
          currentDirectory.children.length &&
          !currentDirectory.children.find(
            (child) => child.name === directoryName
          )
        ) {
          const newElement = createNew(
            directoryName,
            true,
            0,
            [],
            currentDirectory
          );
          currentDirectory.children = [
            ...currentDirectory.children,
            newElement,
          ];
        }
      }

      // indicates a child file with its size
      if (parseInt(detailedLine[0])) {
        const fileName = detailedLine[1];
        const newElement = createNew(
          fileName,
          false,
          parseInt(detailedLine[0]),
          [],
          currentDirectory
        );
        currentDirectory.children = [...currentDirectory.children, newElement];
        // newElement.parent.size = newElement.parent.size + newElement.size;
      }
    }
  });

  return fileSystem;
};

const getAllDirectories = (directory) =>
  directory.children.reduce((prev, curr) => {
    if (!curr.size) return [...prev, curr, ...getAllDirectories(curr)];
    return prev;
  }, []);

const getAllDirectoriesSize = (directory) =>
  directory.children.reduce(
    (prev, curr) =>
      prev + (curr.size ? Number(curr.size) : getAllDirectoriesSize(curr)),
    0
  );

const getSumOfDirectoriesSize = (input) => {
  return getAllDirectories(getFileSystem(input))
    .map((directory) => getAllDirectoriesSize(directory))
    .filter((size) => size <= 100000)
    .reduce((prev, curr) => prev + curr);
};

const getTotalSizeOfirectoryToDelete = (input) => {
  const totalSpace = 70000000;
  const unusedSpaceNeeded = 30000000;

  const fileSystem = getFileSystem(input);
  const allDirectories = getAllDirectories(fileSystem); // a, e, d
  const allDirectoriesSize = allDirectories
    .map((directory) => getAllDirectoriesSize(directory))
    .reduce((prev, curr) => prev + curr);
  const allRootFilesSize = fileSystem.children
    .filter((child) => !child.isDirectory)
    .map((child) => child.size)
    .reduce((prev, curr) => prev + curr);
  const rootDirectorySize = allDirectoriesSize + allRootFilesSize;

  const currentAvailableSpace = totalSpace - rootDirectorySize;
  const spaceToDelete = unusedSpaceNeeded - currentAvailableSpace;

  const directoriesToDelete = allDirectories
    .map((directory) => getAllDirectoriesSize(directory))
    .filter((size) => size >= spaceToDelete);

  const directoryToDelete = directoriesToDelete.length
    ? Math.min(...directoriesToDelete)
    : rootDirectorySize > spaceToDelete
    ? rootDirectorySize
    : [];

  return directoryToDelete;
};

console.log(getTotalSizeOfirectoryToDelete(input));

// 14848514 + 8504156 + 94 853 + 24 933 642 + 584 = 48 381 749
// a = 29116 + 2557 + 62596 + e (584) = 94 853
// d = 4060174 + 8033020 + 5626152 + 7214296 = 24 933 642
// e = 584

// - / (dir)
//   - a (dir)
//     - e (dir)
//       - i (file, size=584)
//     - f (file, size=29116)
//     - g (file, size=2557)
//     - h.lst (file, size=62596)
//   - b.txt (file, size=14848514)
//   - c.dat (file, size=8504156)
//   - d (dir)
//     - j (file, size=4060174)
//     - d.log (file, size=8033020)
//     - d.ext (file, size=5626152)
//     - k (file, size=7214296)
