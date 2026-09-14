const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

const posts = [
  {
    title: "A Morning in the Forest",
    body: "A red fox trots silently through fresh snow, pausing to sniff the cold air before disappearing into the trees.",
    expectedCategory: "accepted",
  },
  {
    title: "Pack Behavior in Winter",
    body: "The wolf pack moves as one, tracking prey across the frozen tundra as the sun sets behind the pines.",
    expectedCategory: "accepted",
  },
  {
    title: "Sunset Over the Mountains",
    body: "Golden light spills across the ridgeline as clouds drift low over the valley below.",
    expectedCategory: "rejected",
  },
  {
    title: "A Simple Weeknight Dinner",
    body: "Fresh pasta tossed with garlic, olive oil, and shaved parmesan makes for an easy meal.",
    expectedCategory: "rejected",
  },
  {
    title: "Design Notes on the New Chair",
    body: "The chair's frame is built from powder-coated steel with a molded plywood seat.",
    expectedCategory: "rejected",
  },
  {
    title: "Quarterly Financial Outlook",
    body: "Analysts expect modest growth in the coming quarter as interest rates stabilize.",
    expectedCategory: "no_match",
  },
  {
    title: "A Recipe for Disaster",
    body: "The startup's roadmap changed four times in six months, and morale followed.",
    expectedCategory: "no_match",
  },
  {
    title: "Wildflowers Along the Trail",
    body: "Clusters of purple lupine and orange poppies line the path as bees drift between the blooms.",
    expectedCategory: "rejected",
  },
  {
    title: "A Barn Owl at Dusk",
    body: "The owl perches silently on a fence post, its head turning slowly as it scans the field for movement.",
    expectedCategory: "accepted",
  },
  {
    title: "Portrait of a Craftsman",
    body: "He leans over the workbench, hands steady, focused entirely on the joint he's carving.",
    expectedCategory: "rejected",
  },
];

interface CreatedPost {
  post_id: number;
  expectedCategory: string;
}

async function createPost(post: (typeof posts)[number]): Promise<CreatedPost> {
  const res = await fetch(`${BASE_URL}/api/posts/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: post.title,
      body: post.body,
      expectedCategory:
        post.expectedCategory === "no_match"
          ? undefined
          : post.expectedCategory,
    }),
  });

  if (!res.ok) {
    throw new Error(
      `Failed to create post "${post.title}": ${res.status} ${await res.text()}`,
    );
  }

  // POST /api/posts/ returns the post_vector row: { post_id, vector }
  const { data } = await res.json();

  if (!data?.post_id) {
    throw new Error(
      `No post_id in response for "${post.title}": ${JSON.stringify(data)}`,
    );
  }

  return { post_id: data.post_id, expectedCategory: post.expectedCategory };
}

async function addEvalSet(
  pairs: { post_id: number; expected_category: string }[],
) {
  const res = await fetch(`${BASE_URL}/api/eval`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ eval_set: pairs }),
  });

  if (!res.ok) {
    throw new Error(
      `Failed to add eval set: ${res.status} ${await res.text()}`,
    );
  }

  return res.json();
}

async function main() {
  console.log(`Seeding ${posts.length} eval posts against ${BASE_URL}...`);

  const created: CreatedPost[] = [];
  for (const post of posts) {
    const result = await createPost(post);
    created.push(result);
    console.log(
      `  created post #${result.post_id} (expected: ${result.expectedCategory})`,
    );
  }

  const pairs = created.map((p) => ({
    post_id: p.post_id,
    expected_category: p.expectedCategory,
  }));

  const result = await addEvalSet(pairs);
  console.log(`Added ${result.data.length} eval pairs.`);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
