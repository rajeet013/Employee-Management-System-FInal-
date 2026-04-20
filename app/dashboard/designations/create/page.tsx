import { createDesignation } from "@/actions/designation.actions";

export default function CreateDesignationPage() {
  return (
    <div>
      {/* HEADER */}
      <h1 className="font-bold mx-170">Create Designation</h1>

      {/* FORM CARD */}
      <div>
        <form
          action={createDesignation}
          className="bg-zinc-900 p-6 border border-zinc-800 max-w-md flex flex-col mx-130 my-10"
        >
          {/* INPUT */}
          <input
            name="title"
            placeholder="Designation Title"
            required
            className="p-3 m-3
                      text-sm
                      rounded-md
                    bg-zinc-800
                      border border-zinc-700 space-y-4"
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="bg-lime-400 hover:bg-lime-600 text-white
                      border border-zinc-700 px-0.5 py-4 m-14 rounded"
          >
            Create Designation
          </button>
        </form>
      </div>
    </div>
  );
}
